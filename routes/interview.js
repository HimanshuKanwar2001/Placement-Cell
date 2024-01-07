const express=require('express');
const router=express.Router();

const interviewController=require('../controllers/interviews_controller');



router.get('/add-interview',interviewController.addInterview);
router.post('/create',interviewController.create);
router.get("/destroy/:interviewId", interviewController.destroy);
router.post("/update/:interviewId",interviewController.update);










module.exports=router;
