module.exports.profile = function (req, res) {
  return res.render("user_profile", {
    title: "Profile Page",
  });
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
