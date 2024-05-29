const mongoose = require("mongoose");
const validator = require("validator"); 
const bcrypt = require("bcryptjs");  
const jwt = require("jsonwebtoken");
const SECRET_KEY = "abcdefghijklmnop";

const studentSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: "Not a valid email"
    }
  },
   password: { type: String },
   name:{type:String},
   phone:{type:String},

  Coursereg:[{
    name: { type: String },
  phone: { type: String },
  studentId: { type: String, unique: true},
  courseId:{ type: mongoose.Schema.Types.ObjectId, ref:'course'},
  regDate: { type: Date, default: Date.now },
  session: { type: Number },
  semester: { type: String },
  course: { type: String }
}]
});

studentSchema.pre("save", async function(next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 12);
  }
  next();
});

studentSchema.methods.generateAuthToken = async function() {
  try {
    let newToken = jwt.sign({ _id: this._id }, SECRET_KEY, {
      expiresIn: "1d"
    });
    return newToken;
  } catch (error) {
    throw new Error("Error generating auth token");
  }
};

const Student = mongoose.model("Student", studentSchema);
module.exports = Student;
