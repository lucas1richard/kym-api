/**
 * @module oauth-fitbit
 */

const passport = require('passport');
const FitbitStrategy = require('passport-fitbit-oauth2').FitbitOAuth2Strategy;
const User = require('./db/models/user');
const jwt = require('jwt-simple');

module.exports = (app) => {
  app.use(passport.initialize());

  async function fitbitMiddleware(token, refreshToken, profile, done) {
    try {
      const user = await User.setupFitbit(
        profile,
        token,
        refreshToken
      );
      done(null, user);
    } catch (err) {
      done(err);
    }
  }

  passport.use(
    new FitbitStrategy(
      app.get('oauth').fitbitInfo,
      fitbitMiddleware
    )
  );

  const scope = [
    'profile',
    'activity',
    'nutrition',
    'weight',
    'settings'
  ];

  app.get('/api/auth/fitbit', function getAuthFitbit(req, res) {
    passport.authenticate('fitbit', { scope })(req, res);
  });

  const { callbackURL } = app.get('oauth').fitbitInfo;

  app.get(callbackURL, passport.authenticate('fitbit', {
    failureRedirect: '/',
    session: false
  }), function redirectWithToken(req, res) {
    const fitbitToken = jwt.encode({
      id: req.user.id
    }, app.get('jwtSecret'));

    res.cookie('token', fitbitToken);
    res.redirect('/?login=true');
  });
};
