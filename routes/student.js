const express=require('express');
const router=express.Router();
const studentController=require('../controllers/students_controller');

router.get('/add-student',studentController.addStudent);

router.post('/create',studentController.create);
router.get("/destroy/:studentId", studentController.destroy);




module.exports=router;