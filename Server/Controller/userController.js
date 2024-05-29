const { validationResult } = require("express-validator");
const createError = require("../middleware/errorHandling");
const Student = require("../models/studentSchema");
const Course = require("../models/coursSchema");
const bcrypt = require("bcryptjs");

function generateRandomId(length) {
  const chars = "0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

exports.userRegister = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;
  try {
    if (!email || !password) {
      throw createError(400, "Please Enter All Input Data");
    }

    const data = await Student.findOne({ email: email });
    if (!data) {
      const newUser = new Student({
        email: email,
        password: password,
      });

      const storeData = await newUser.save();
      if (storeData) {
        return res
          .status(200)
          .json({ message: "User registered successfully" });
      }
    } else {
      throw createError(400, "This user already exist in our data base");
    }
  } catch (error) {
    next(error);
  }
};

exports.userLogin = async (req, res, next) => {
  const { email, password } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  if (!email || !password) {
    throw createError(400, "Please Enter Your Email and Password");
  }

  try {
    const preUser = await Student.findOne({ email: email });
    if (preUser) {
      const passwordMatch = await bcrypt.compare(password, preUser.password);
      if (passwordMatch) {
        const token = await preUser.generateAuthToken();
        return res
          .status(200)
          .json({ message: "User Login Successfully Done", userToken: token });
      } else {
        throw createError(400, "Please check your password");
      }
    } else {
      throw createError(400, "Please check your Email Id");
    }
  } catch (error) {
    next(error);
  }
};

exports.getuserProfile = async (req, res, next) => {
  const { id } = req.params;
  try {
    const data = await Student.findOne({ _id: id });

    if (data) {
      res.status(200).json({ data });
    }
  } catch (error) {
    next(error);
  }
};

exports.updateUserProfile = async (req, res, next) => {
  const { id } = req.params;

  const { name, email, phone } = req.body;
  try {
    const profiledata = await Student.findOne({ _id: id });
    if (profiledata) {
      const updatedData = await Student.updateOne(
        { _id: id },
        { $set: { name, email, phone } }
      );
      if (updatedData.nModified > 0) {
        res
          .status(200)
          .json({ message: "Student Profile updated Successfully" });
      } else {
        res.status(200).json({ message: "No changes made to the profile" });
      }
    } else {
    }
  } catch (error) {
    next(error);
  }
};

exports.getAllCourse = async (req, res, next) => {
  try {
    const data = await Course.find({});
    if (data) {
      return res.status(200).json({ data });
    }
  } catch (error) {
    next(error);
  }
};

exports.courseRegister = async (req, res, next) => {
  const { id } = req.params;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { session, semester, name, courseId, phone } = req.body;
  try {
    const studentData = await Student.findOne({ _id: id });
    if (studentData) {
      studentData.Coursereg.push({
        name,
        phone,
        studentId: generateRandomId(6),
        regDate: new Date(),
        session,
        semester,
        courseId,
      });

      const savedStudent = await studentData.save();
      res
        .status(200)
        .json({
          message: "Course Registered Successfully",
          student: savedStudent,
        });
    } else {
      return next(createError(400, "Student not found"));
    }
  } catch (error) {
    next(error);
  }
};

exports.getAllRegisterdCourse = async (req, res, next) => {
  const { id } = req.params;
  try {
    const data = await Student.findOne({ _id: id });
    const course = await Course.find({});
    if (data) {
      res.status(200).json({ data, course });
    }
  } catch (error) {
    next(error);
  }
};

exports.deleteCourse = async (req, res, next) => {
  const { id, courseid } = req.params;
  try {
    const data = await Student.updateOne(
      { _id: id },
      { $pull: { Coursereg: { _id: courseid } } }
    );
    if (data) {
      res.status(200).json({ message: "Course deleted successfully" });
    } else {
      res.status(404).json({ message: "Course not found" });
    }
  } catch (error) {
    next(error);
  }
};
