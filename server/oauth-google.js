/**
 * @module oauth-google
 */

const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const { connectDatabase } = require('@kym/db');
const { User } = connectDatabase();
const jwt = require('jwt-simple');

module.exports = (app) => {
  app.use(passport.initialize());

  // Google strategy
  passport.use(new GoogleStrategy(app.get('oauth').googleInfo, async (token, refreshToken, profile, done) => {
    try {
      const nameArray = profile.displayName.split(' ');

      const defaults = {
        firstname: nameArray[0],
        lastname: nameArray[1],
        username: profile.emails[0].value,
        email: profile.emails[0].value,
        password: profile.id,
      };

      const [user] = await User.findOrCreate({ where: { googleId: profile.id }, defaults });
      done(null, user);
    } catch (err) {
      done(err);
    }
  }));

  app.get('/api/auth/google', passport.authenticate('google', {
    scope: 'email',
    session: false,
  }));

  // passport will exchange token from google with a token which we can use.
  app.get(app.get('oauth').googleInfo.callbackURL, passport.authenticate('google', {
    failureRedirect: '/',
    session: false,
  }), function redirectWithToken(req, res) {
    const jwtToken = jwt.encode({ id: req.user.id }, app.get('jwtSecret'));
    res.redirect(`/?token=${jwtToken}`);
  });
};
