// config/passport.js

var LocalStrategy   = require('passport-local').Strategy;
var fs              = require('fs');

// expose this function to our app using module.exports
module.exports = function(passport) {

    // used to serialize the user for the session
    passport.serializeUser(function (login, done) {
        done(null, login);
    });

    // used to deserialize the user
    passport.deserializeUser(function (login, done) {
        done(null, login);
    });

    passport.use(new LocalStrategy({
        usernameField: 'login',
        passwordField: 'password'
    }, function (login, password, done) {
        users = fs.readFileSync("./users.json");
        users = JSON.parse(users);
        
        if(users[login] != undefined && users[login] == password) {
            return done(null, login);
        } else {
            return done(null, false);
        }
    }));

};