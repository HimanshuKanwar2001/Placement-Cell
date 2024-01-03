const Interview = require("../models/interview");
const Student = require("../models/student");

//render the addInterview page
module.exports.addInterview = function (req, res) {
  // if (req.isAuthenticated()) {
    return res.render("add_interview", {
      title: "Interview Details",
    });
  // }
  return res.redirect('/');
};


//Create Interview
module.exports.create=async function(req,res){
  
    try{
        await Interview.create({
          company: req.body.company,
          date: req.body.date,
        });
        return res.redirect('back');

    }catch(err){
        console.error("ERROR:",err);
        return res.status(500).send("Internal Server Error");
    }
}

