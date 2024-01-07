const Student = require("../models/student");
const Interview = require("../models/interview");
const Result = require("../models/company");

//render add student page
module.exports.addStudent = async function (req, res) {
  try {
      if (req.isAuthenticated()) {
    return res.render("add_student", {
      title: "Add Student",
    });
      }

    return res.redirect("/users/sign-in");
  } catch (err) {
    console.error("Error:", err);
    return res.status(500).send("Internal Server Error");
  }
};

//create new student
module.exports.create = async function (req, res) {
  try {
    const student = await Student.findOne({ email: req.body.email });

    if (!student) {
      await Student.create({
        email: req.body.email,
        batch: req.body.batch,
        name: req.body.name,
        college: req.body.college,
        status: req.body.status,
        dsa_score: req.body.dsa_score,
        webdev_score: req.body.webdev_score,
        react_score: req.body.react_score,
      });
    }
    return res.redirect("back");
  } catch (err) {
    console.error("Error:", err);
    return res.status(500).send("Internal Server Error");
  }
};

module.exports.destroy = async function (req, res) {
  const student = await Student.findById(req.params.studentId);
  await student.deleteOne();

  await Interview.deleteMany({ studentId: req.params.studentId });
  return res.redirect("back");
};
