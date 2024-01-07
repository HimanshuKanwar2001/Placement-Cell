const Student = require("../models/student");
const Interview = require("../models/interview");
const Company = require("../models/company");

module.exports.companyPage = async function (req, res) {
  try {
    if(req.isAuthenticated()){
    
    const student = await Student.find({});
    const interview = await Interview.find({});
    const company = await Company.find({});

    return res.render("company", {
      title: "Student Results",
      // all_students: student,
      // all_interview: interview,
      all_company: company,
    });
  }
  return res.redirect("/users/sign-in");

  } catch (err) {
    console.error("Error:", err);
    return res.status(500).send("Internal Server Error");
  }
};

module.exports.create = async function (req, res) {
  try {
    const company = await Company.findOne({ name: req.body.name });
    // const [studentId, studentName] = req.body.name.split(",");
    // const [companyId, companyName, companyDate] = req.body.company.split(",");
    // console.log(studentId, studentName, companyId, companyName, companyDate);
    if (!company) {
      const company = await Company.create({
        name: req.body.name,
        date: req.body.date,
      });
    }
    return res.redirect("back");
  } catch (err) {
    console.error("Error:", err);
    return res.status(500).send("Internal Server Error");
  }
};


module.exports.delete=async function (req,res){
try {
  const cpyId=req.params.companyId;
  const company = await Company.findById(cpyId);
  let companyID=company._id;
  await company.deleteOne();
  const interview = await Interview.deleteMany({companyId:companyID});
  return res.redirect("back");
  
} catch (err) {
  console.error("Error:", err);
  return res.status(500).send("Internal Server Error");
}
}