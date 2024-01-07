const express=require('express');
const router=express.Router();
const companyController=require('../controllers/company_controller');

router.get("/add-company", companyController.companyPage);
router.post("/create", companyController.create);
router.get("/destroy/:companyId", companyController.delete);

module.exports=router;