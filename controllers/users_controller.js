const User = require("../models/user");

module.exports.profile = async function (req, res) {
  try {
    if (req.cookies.user_id) {
      const user = await User.findById(req.cookies.user_id);
      console.log("user", user);
      if (user) {
        return res.render("user_profile", {
          title: "User Profile",
          user: user,
        });
      }
      return res.redirect("/users/sign-in");
    } else {
      return res.redirect("/users/sign-in");
    }
  } catch (err) {
    console.error("Error:", err);
    return res.status(500).send("Internal Server Error");
  }
};

//render Sign Up page
module.exports.signUp = function (req, res) {
  return res.render("user_sign_up", {
    title: "Placement Cell | Sign Up",
  });
};

//render Sign In page
module.exports.signIn = function (req, res) {
  return res.render("user_sign_in", {
    title: "Placement Cell | Sign In",
  });
};

//get the sign up data
module.exports.create = async function (req, res) {
  if (req.body.password != req.body.confirm_password) {
    return res.redirect("back");
  }
  try {
    const user = await User.findOne({ email: req.body.email });

    console.log("Is User Present ", user);

    if (!user) {
      const newUser = await User.create(req.body);
      return res.redirect("/users/sign-in");
    } else {
      return res.redirect("back");
    }
  } catch (err) {
    console.error("Error:", err.message);
    return res.status(500).send("Internal Server Error");
  }
};

//sing in and create a session for the user
module.exports.createSession = async function (req, res) {
  try {
    //steps to authenticate
    //find the user
    const user = await User.findOne({ email: req.body.email });
    //handle user found
    if (user) {
      //handle password which doesn't match

      if (user.password != req.body.password) {
        return res.redirect("back");
      }

      //handle session creation
      res.cookie("user_id", user.id);
      return res.redirect("/users/profile");
    } else {
      // handle user not found
      return res.redirect("back");
    }
  } catch (err) {
    console.error("Error:", err);
    return res.status(500).send("Internal Server Error");
  }
};
//sign out from the profile
module.exports.signOut = function (req, res) {
  if (req.cookies.user_id) {
    res.clearCookie("user_id");
    return res.redirect("/users/sign-in");
  } else {
    return res.redirect("/users/sign-in");
  }
};
