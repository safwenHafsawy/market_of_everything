"use strict";

const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const { Users } = require("./database_config").models;
const {validatePassword} =require("../lib/passwordUtils");

/**
 * -------------- LOCAL STRATEGY ----------------
 */
const defaultFields = {
  usernameField: "identifier",
  passwordField: "password_v",
}

const localStgCallback = (username, password_p, done) => {

  Users.findOne({ username }, (err, user) => {
    //internal error (connection errorr ....)
    if (err) return done(err);
    //user not found e.g. username is wrong...
    if (!user){
			 return done(null, false, { message: "USER NOT FOUND !" });
		}
    //the given pw dosen't match with password stored in the DB
    //TO BE CHANGED !!!
    if (!validatePassword(user.hash,user.salt ,password_p)) {
      return done(null, false, { message: "PASSWORD INCORRECT !" });
    }
    //everything is ok, authenticate and return user object
    return done(null, user);
  });
};

passport.use(new localStrategy(defaultFields,localStgCallback));

//serializeUser determines which user data is stored in the session, the result is attached to user attribute of the session method
passport.serializeUser((user, cb) => {
  cb(false, user._id); //the user.id is saved in the session and later used to retive the hole object
});

//deserializeUser returns the user object from a given data(id,username...), the object is attached to req.user
passport.deserializeUser((userID, cb) => {
  Users.findById({ _id: userID })
    .then((user) => cb(null, user))
    .catch((err) => {
      cb(err);
    });
});
