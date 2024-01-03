const Student=require('../models/student');
const Interview=require('../models/interview');


module.exports.home = async function (req, res) {
  try{
    // console.log(req.cookies);
    // res.cookie("user_id", 100);

    const students = await Student.find({}).populate("interviews");
    console.log("Interviews data",students.interviews);

    const interview= await Interview.find({}).populate("students.student");

    res.render("home", {
      title: "Students Data",
      allStudents: students,
      allInterview:interview,
    });
  }catch(err){
    console.error("Error:",err);
    return res.status(500).send("Internal Server Error");
  }
};
