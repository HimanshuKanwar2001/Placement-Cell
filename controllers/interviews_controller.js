const Interview = require("../models/interview");
const Student = require("../models/student");
const Company = require("../models/company");
const json2csv = require("json2csv").parse;
const fs = require("fs");
const path = require("path");

//render the addInterview page
module.exports.addInterview = async function (req, res) {
  try {
    if (req.isAuthenticated()) {
    const interviews = await Interview.find({});
    const students = await Student.find({});
    const company = await Company.find({});

    return res.render("add_interview", {
      title: "Interview Details",
      allInterview: interviews,
      allStudent: students,
      allCompany: company,
    });
    }
    return res.redirect("/users/sign-in");
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
    // console.log("Student data here while creating new Interview", student);
    if (!student) {
      console.error("Student not found");
      return res.status(404).send("Student not found");
    }

    student.interviews.push(interview);
    await student.save();

    // Update Companies Interviews Array
    const company = await Company.findById(companyId);
    // console.log("Student data here while creating new Interview", company);
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
    let interviewId = req.params.interviewId;
    const interview = await Interview.findById(interviewId);
    let studentId = interview.studentId;
    let companyId = interview.companyId;
    console.log("companyID", companyId);

    await interview.deleteOne();
    const student = await Student.findByIdAndUpdate(studentId, {
      $pull: { interviews: interviewId },
    });
    const company = await Company.findByIdAndUpdate(companyId, {
      $pull: { interviews: interviewId },
    });
    console.log("Company", company);
    return res.redirect("back");
  } catch (err) {
    console.error("ERROR:", err);
    return res.status(500).send("Internal Server Error");
  }
};

module.exports.update = async function (req, res) {
  try {
    const interviewId = req.params.interviewId;
    const status = req.body.status;
    console.log("interviewId", interviewId, "and status", status);
    const interview = await Interview.findByIdAndUpdate(interviewId, {
      $set: { status: status },
    });
    return res.redirect("back");
  } catch (err) {
    console.error("ERROR:", err);
    return res.status(500).send("Internal Server Error");
  }
};

module.exports.exportUser = async function (req, res) {
  // -	Student id, student name, student college, student status, DSA Final Score, WebD Final Score, React Final Score, interview date, interview company, interview student result
  try {
    
    if(req.isAuthenticated()){
        const interviews = await Interview.find({}).populate("studentId");
        let users = interviews.map((data) => {
          return {
            Student_Id: data.studentId._id,
            Student_Name: data.studentId.name,
            Student_College: data.studentId.college,
            Student_Status: data.studentId.status,
            DSA_Final_Score: data.studentId.dsa_score,
            WebDev_Final_Score: data.studentId.webdev_score,
            React_Score: data.studentId.react_score,
            Interview_Date: data.interviewDate,
            Interview_Company: data.companyName,
            Interview_Result: data.status,
          };
        });

        const csv = json2csv(users);

        const filePath = path.join(__dirname, "Student_Info.csv");
        fs.writeFileSync(filePath, csv);

        return res.download(filePath, "Student_Info.csv", (err) => {
          if (err) {
            console.error("Error while sending file:", err);
            return res.status(500).send("Internal Server Error");
          }
          // Delete the file after it has been sent
          fs.unlinkSync(filePath);
        });
    }
    return res.redirect('/users/sign-in');
  } catch (err) {
    console.error("ERROR:", err);
    return res.status(500).send("Internal Server Error");
  }
};
