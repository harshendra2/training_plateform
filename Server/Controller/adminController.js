const { validationResult } = require("express-validator");
const createError = require("../middleware/errorHandling");
const admin = require("../models/adminSchema");
const Course = require("../models/coursSchema");
const bcrypt = require("bcryptjs");

exports.adminregister = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return next(createError(400, "Please Enter All Input Data"));
    }

    const adminregister = new admin({
      email: email,
      password: password,
    });

    const storeData = await adminregister.save();
    if (storeData) {
      return res.status(200).json({ message: "Admin register successfuly" });
    }
  } catch (error) {
    next(error);
  }
};

exports.adminLogin = async (req, res, next) => {
  const { email, password } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  if (!email || !password) {
    return next(createError(400, "Please Enter Your Email and Password"));
  }

  try {
    const preAdmin = await admin.findOne({ email: email });
    if (preAdmin) {
      const passwordMatch = await bcrypt.compare(password, preAdmin.password);
      if (passwordMatch) {
        const token = await preAdmin.generateAuthtoken();
        return res
          .status(200)
          .json({ message: "Admin Login Succesfully Done", adminToken: token });
      } else {
        return next(createError(400, "Please check your password"));
      }
    } else {
      return next(createError(400, "Please check your Email Id"));
    }
  } catch (error) {
    next(error);
  }
};

exports.addNewCourese = async (req, res, next) => {
  const { title, description, startDate, endDate } = req.body;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const SingleData = await Course.findOne({ title });

    if (!SingleData) {
      const course = new Course({
        title,
        description,
        start_date: startDate,
        end_date: endDate,
      });

      const data = await course.save();

      res
        .status(200)
        .json({ message: "Course added successfully", course: data });
    } else {
      return next(
        createError(400, "This Course already exists in our database")
      );
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

exports.deleteCourses = async (req, res, next) => {
  const { id } = req.params;

  try {
    const deletedCourse = await Course.findByIdAndDelete(id);

    if (!deletedCourse) {
      return next(createError(404, "Course not found"));
    }

    res
      .status(200)
      .json({ message: "Course deleted successfully", course: deletedCourse });
  } catch (error) {
    next(error);
  }
};

exports.getSingleDocumnetCours = async (req, res, next) => {
  const { id } = req.params;
  try {
    const data = await Course.findOne({ _id: id });
    if (data) {
      res.status(200).json({ data });
    } else {
      return next(createError(404, "Course not found"));
    }
  } catch (error) {
    next(error);
  }
};

exports.EditCourse = async (req, res, next) => {
  const { id } = req.params;
  const { title, description, startDate, endDate } = req.body;
  try {
    const data = await Course.updateOne(
      { _id: id },
      {
        $set: {
          title: title,
          description,
          start_date: startDate,
          end_date: endDate,
        },
      }
    );
    if (data) {
      res
        .status(200)
        .json({ message: "Course Edited Successfully", course: data });
    }
  } catch (error) {
    next(error);
  }
};
