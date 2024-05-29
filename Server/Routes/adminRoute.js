const express=require('express');
const router=express.Router();
const controller=require('../Controller/adminController')
const verifyToken = require("../middleware/auth");

router.post("/register", controller.adminregister);
router.post("/login", controller.adminLogin);
router.post("/create",verifyToken,controller.addNewCourese);
router.get("/getcourse",verifyToken,controller.getAllCourse);
router.delete("/delete/:id",verifyToken,controller.deleteCourses);
router.get("/getcourse/:id",verifyToken,controller.getSingleDocumnetCours)
router.put("/course/edit/:id",verifyToken,controller.EditCourse);

module.exports=router;