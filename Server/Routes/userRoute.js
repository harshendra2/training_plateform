const express=require('express');
const router=express.Router();
const controller=require("../Controller/userController")
const verifyToken = require("../middleware/auth");

router.post("/register", controller.userRegister);
router.post("/login", controller.userLogin);
router.get("/profile/:id",verifyToken,controller.getuserProfile)
router.put("/profile/edit/:id",verifyToken,controller.updateUserProfile)
router.get("/getcourse",verifyToken,controller.getAllCourse);
router.put("/course/reg/:id",verifyToken,controller.courseRegister)
router.get("/course/get/:id",verifyToken,controller.getAllRegisterdCourse)
router.delete("/course/delete/:id/:courseid",verifyToken,controller.deleteCourse)



module.exports=router;