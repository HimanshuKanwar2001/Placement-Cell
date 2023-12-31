module.exports.home = function (req, res) {
  console.log(req.cookies);
  res.cookie("user_id", 100);
  res.render("home", {
    title: "Student Details",
  });
};
