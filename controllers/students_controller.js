const Student = require("../models/student");
const Interview=require('../models/interview');

//render add student page
module.exports.addStudent = function (req, res) {
//   if (req.isAuthenticated()) {
    return res.render("add_student", {
      title: "Add Student",
    });
//   }

  return res.redirect("/");
};



//create new student
module.exports.create=async function(req,res){
    try{
        const student=await Student.findOne({email:req.body.email});

        if(!student){
            await Student.create({
                email:req.body.email,
                batch:req.body.batch,
                name:req.body.name,
                college:req.body.college,
                status:req.body.status,
                dsa_score:req.body.dsa_score,
                webdev_score:req.body.webdev_score,
                react_score:req.body.react_score,
             });
        }
        return res.redirect("back");

    }catch(err){
        console.error("Error:",err);
        return res.status(500).send("Internal Server Error");
    }
}



