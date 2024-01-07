const Interview = require("../models/interview");
const Student = require("../models/student");
const Company = require("../models/company");

//render the addInterview page
module.exports.addInterview = async function (req, res) {
  try {
    const interviews = await Interview.find({});
    const students = await Student.find({});
    const company = await Company.find({});

    // if (req.isAuthenticated()) {
    return res.render("add_interview", {
      title: "Interview Details",
      allInterview: interviews,
      allStudent: students,
      allCompany: company,
    });
    // }
    return res.redirect("/");
  } catch (err) {
    console.error("ERROR:", err);
    return res.status(500).send("Internal Server Error");
  }
};

//Create Interview
module.exports.create = async function (req, res) {
  try {
    const [studentId, studentBatch, studentName] =
      req.body.studentName.split(",");
    const [companyId, companyName, companyDate] =
      req.body.companyName.split(",");
    const interview = await Interview.create({
      studentId: studentId,
      studentBatch: studentBatch,
      studentName: studentName,
      companyId: companyId,
      companyName: companyName,
      interviewDate: companyDate,
    });
    // Update Student's Interviews Array
    const student = await Student.findById(studentId);
    console.log("Student data here while creating new Interview", student);
    if (!student) {
      console.error("Student not found");
      return res.status(404).send("Student not found");
    }

    student.interviews.push(interview);
    await student.save();

    // Update Companies Interviews Array
    const company = await Company.findById(companyId);
    console.log("Student data here while creating new Interview", company);
    if (!company) {
      console.error("Company not found");
      return res.status(404).send("Company not found");
    }

    company.interviews.push(interview);
    await company.save();

    return res.redirect("back");
  } catch (err) {
    console.error("ERROR:", err);
    return res.status(500).send("Internal Server Error");
  }
};

module.exports.destroy = async function (req, res) {
 try {
   const interview = await Interview.findById(req.params.interviewId);
   let studentId = interview.studentId;
   await interview.deleteOne();
   const student = await Student.findByIdAndUpdate(studentId, {
     $pull: { interviews: req.params.interviewId },
   });
   return res.redirect("back");
 } catch (err) {
   console.error("ERROR:", err);
   return res.status(500).send("Internal Server Error");
 }
};

module.exports.update=async function(req,res){
  try {
    const interviewId=req.params.interviewId;
    const status=req.body.status;
    console.log("interviewId", interviewId,"and status",status);
    const interview = await Interview.findByIdAndUpdate(interviewId,{
      $set:{status:status},
    });
    return res.redirect('back');

  } catch (err) {
    console.error("ERROR:", err);
    return res.status(500).send("Internal Server Error");
  }
}