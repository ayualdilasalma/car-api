const passport = require('passport');
const mongoose = require('mongoose');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../config/keys');
const User = mongoose.model('users');

passport.use(
    new GoogleStrategy({
        clientID: keys.googleClientID,
        clientSecret: keys.googleClientSecret,
        callbackURL: '/auth/google/callback'
    }, 
    (accessToken, refreshToken, profile, done) => {
        const { id } = profile;
        User.findOne({ googleId: id })
            .then( (existingUser) => {
                if ( existingUser ) {
                    // we have a re
                } else {
            new User({
                googleId: id
            }).save();
                }
            });
        
    })
);