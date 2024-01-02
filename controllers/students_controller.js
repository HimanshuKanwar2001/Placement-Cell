const Student = require("../models/student");

//render add student page
module.exports.addStudent = function (req, res) {
  if (req.isAuthenticated()) {
    return res.render("add_student", {
      title: "Add Student",
    });
  }
};




