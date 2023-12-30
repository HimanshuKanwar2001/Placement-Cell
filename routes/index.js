const express=require('express');
const router=express.Router();
const stdDetailPage=require('../controllers/studentDetails');

router.get("/", stdDetailPage.studentDetailsPage);

console.log("Router loaded");


module.exports=router;