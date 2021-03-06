const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

const User = mongoose.model('users');

passport.serializeUser((user, done) => {
  // turn user instance to id and turn into cookie
  // done is a callback
  done(null, user.id); // first argument is an error object. null means no error. user.id is not profile id. it is an id generated by Mongo. We use it because not all users sign in with Google
});

passport.deserializeUser((id, done) => {
  // turn id/cookie into user instance
  User.findById(id).then(user => {
    done(null, user);
  });
});

// passport.use(
//   new GoogleStrategy(
//     {
//       clientID: keys.googleClientID,
//       clientSecret: keys.googleClientSecret,
//       callbackURL: '/auth/google/callback',
//       proxy: true
//     },

//     (accessToken, refreshToken, profile, done) => {
//       console.log('access token', accessToken);
//       console.log('refresh token', refreshToken);
//       console.log('profile', profile);
//       User.findOne({ googleId: profile.id }) // go through User collection, find the first record in the collection with googleId=profile.id. Returns a promise.
//         .then(existingUser => {
//           if (existingUser) {
//             // we have a record with the given profile id
//             done(null, existingUser);
//           } else {
//             new User({ googleId: profile.id }) // creates new model instance
//               .save()
//               .then(user => done(null, user)); // user got back from the database
//           }
//         });
//     }
//   )
// );

// passport.use(
//   new GoogleStrategy(
//     {
//       clientID: keys.googleClientID,
//       clientSecret: keys.googleClientSecret,
//       callbackURL: '/auth/google/callback',
//       proxy: true
//     },

//     async (accessToken, refreshToken, profile, done) => {
//       console.log('access token', accessToken);
//       console.log('refresh token', refreshToken);
//       console.log('profile', profile);
//       const existingUser = await User.findOne({ googleId: profile.id }); // go through User collection, find the first record in the collection with googleId=profile.id. Returns a promise.

//       if (existingUser) {
//         // we have a record with the given profile id
//         done(null, existingUser);
//       } else {
//         const user = await new User({ googleId: profile.id }).save(); // creates new model instance
//         done(null, user); // user got back from the database
//       }
//     }
//   )
// );

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: '/auth/google/callback',
      proxy: true
    },

    async (accessToken, refreshToken, profile, done) => {
      console.log('access token', accessToken);
      console.log('refresh token', refreshToken);
      console.log('profile', profile);
      const existingUser = await User.findOne({ googleId: profile.id }); // go through User collection, find the first record in the collection with googleId=profile.id. Returns a promise.

      if (existingUser) {
        // we have a record with the given profile id
        return done(null, existingUser); // add "return" so we don't need "else"
      }
      const user = await new User({ googleId: profile.id }).save(); // creates new model instance
      done(null, user); // user got back from the database
    }
  )
);
