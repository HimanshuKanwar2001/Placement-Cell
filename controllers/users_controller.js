const User = require("../models/user");

module.exports.profile = function (req, res) {
  return res.render("user_profile", {
    title: "Profile Page",
  });
};

//render Sign Up page
module.exports.signUp = function (req, res) {

  if (req.isAuthenticated()) {
    return res.redirect("/users/profile");
  }
  return res.render("user_sign_up", {
    title: "Placement Cell | Sign Up",
  });
};

//render Sign In page
module.exports.signIn = function (req, res) {

  if (req.isAuthenticated()) {
    return res.redirect("/users/profile");
  }
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
module.exports.createSession = function (req, res) {
  return res.redirect("/");
};

module.exports.destroySession=function(req,res){
    req.logout((err)=>{
      if(err){
        return res.status(500).send("Error logging out");
      }
    });

    return res.redirect('/');
}