const express=require('express');
const router=express.Router();
const studentController=require('../controllers/students_controller');

router.get('/add-student',studentController.addStudent);




module.exports=router;