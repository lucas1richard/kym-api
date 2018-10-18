// const router = require('express').Router();
// const passport = require('passport');
// const FitbitStrategy = require('passport-fitbit-oauth2').FitbitOAuth2Strategy;
// const User = include('db/models/user');
// const jwt = require('jwt-simple');

// module.exports = (app) => {
//   app.use(passport.initialize());

//   passport.use(new FitbitStrategy({
//     clientID: '228KRW',
//     clientSecret: 'd62c7987b84deeb6005a3aeb7f9bb283',
//     callbackURL: 'http://localhost:3000/api/auth/fitbit/callback'
//   }, function (token, tokenSecret, profile, done) {
//     User.findOrCreate({
//       where: {
//         fitbitId: profile._json.user.encodedId,
//         fitbitToken: token
//       },
//       defaults: {
//         firstname: profile._json.user.fullName,
//         lastname: profile._json.user.fullName,
//         password: 'hello'
//       }
//     }).spread(user => {
//       done(null, _user);
//     }).catch(done);
//     console.log('profile.....', profile);
//     // done(null) console.log('callback');
//   }));

//   // app.use((req, res, next) => {
//   //   console.log(req.headers.host);
//   //   if (req.headers.host !== 'localhost:3000') {
//   //     res.setHeader('token', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6M30.hzfEQOcJdvat6x_di6IDwi_tykCfKIAeehBukstyS14');
//   //     res.sendFile(path.join(__dirname, '../../public/index.html'));
//   //   } else {
//   //     next();
//   //   }
//   // });

//   app.get('/', passport.authenticate('fitbit', {
//     scope: ['profile', 'activity']
//   }));

//   app.get('/callback', passport.authenticate('fitbit', {
//     // successRedirect: '/auth/fitbit/success',
//     failureRedirect: '/',
//     session: false
//   }), function (req, res) {
//     console.log('callback');
//     var fitbitToken = jwt.encode({
//       token: req.oauth.token
//     }, process.env.JWT_SECRET || '1701-Flex-NY');
//     res.redirect(`/?token=${fitbitToken}`);
//     // res.setHeader('token', fitbitToken);
//     // res.sendFile(path.join(__dirname, '../../public/index.html'));
//     // ?fitbittoken=${fitbitToken}`
//   });

// };
