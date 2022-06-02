// Setup for passport google authentication
/* eslint-disable */
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
require('dotenv').config();
const { User } = require('../sequelize/index');
const dbHelpers = require('../sequelize/db-helpers');

// get information from user to create cookie to send to browser
passport.serializeUser((user, next) => {
  next(null, user.googleId); // possibly change to user.id
});


// take id from stored cookie sent from browser and find user
passport.deserializeUser((id, next) => {
  User.findOne({
    where: {
      googleId: id,
    },
  })
    .then((user) => {
      next(null, user);
    }).catch((err) => { console.log(err); });
});
const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } = process.env;
passport.use(
  new GoogleStrategy({
    callbackURL: '/auth/google/redirect',
    clientID: GOOGLE_CLIENT_ID,//'831550743885-7a7f8m0t6pli22clvmresvbqg1uncdi1.apps.googleusercontent.com',
    clientSecret: GOOGLE_CLIENT_SECRET,//'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',
  }, (accessToken, refreshToken, profile, next) => {
      console.log({google_id: profile.id, displayName: profile.displayName, email: profile.emails[0].value, photos: profile.photos[0].value});
    // check if user already exists in DB
    // find user with matching googleId and profile.id
    User.findOne({
      where: {
        googleId: profile.id,
      },
    })
      .then((currentUser) => {
        if (currentUser) {
          // if user exists
          console.log('user returning')
          next(null, currentUser);
        } else {
          // if user doesn't exist
          // use profile.id & profile.displayName for saving in db
          // create new sequelize User given ^
          console.log('create user');
          User.create({
            username: profile.displayName,
            googleId: profile.id,
            isQuizzed: false,
            email: profile.emails[0].value,
            theme: true,
          })
            .then((newUser) => {
              dbHelpers.createPreferences(newUser.dataValues.id);
              next(null, newUser);
            }).catch((err) => { console.log(err); });
        }
      });
  }),
);
