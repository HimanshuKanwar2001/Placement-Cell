const passport = require("passport");

const LocalStrategy = require("passport-local").Strategy;

const User = require("../models/user");

//authentiaction using passport
passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
    },
    async function (email, password, done) {
      try {
        //find a user and establish the identity
        const user = await User.findOne({ email: email });
        if (!user || user.password != password) {
          console.log("Invalid Username/Password");
          return done(null, false);
        }
        return done(null, user);
      } catch (err) {
        console.error("Error:", err);
        return done(err);
      }
    }
  )
);

//serializing the user to decided which key is to be kept in the cookies
passport.serializeUser(function (user, done) {
  done(null, user.id);
});

//deserializing the user from the key in the cookies
passport.deserializeUser(async function (id, done) {
  try {
    const user = User.findById(id);
    return done(null, user);
  } catch (err) {
    console.error("Error:", err);
    return done(err);
  }
});

module.exports = passport;
