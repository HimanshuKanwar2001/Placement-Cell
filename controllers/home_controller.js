const Student=require('../models/student');
const Interview=require('../models/interview');


module.exports.home = async function (req, res) {
  try {
    const students = await Student.find({});
    const allStudents = await Student.find({}).populate("interviews");
    console.log(allStudents);
    res.render("home", {
      title: "Students Data",
      allStudents: allStudents,
    });
  } catch (err) {
    console.error("Error:", err);
    return res.status(500).send("Internal Server Error");
  }
};

// module.exports.showDetails=async function(req,res){
//   try {
//     const studentId = req.params.studentId.slice(1);
//     const student = await Student.findById(studentId).populate("interviews").exec();
//     console.log("Student",student.interviews);
//   } catch (err) {
//     console.error("Error:", err);
//     return res.status(500).send("Internal Server Error");
//   }
// }
