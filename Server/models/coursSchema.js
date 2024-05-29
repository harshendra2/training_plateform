const mongoose = require("mongoose");
 
const courseSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    start_date: { type: Date, required: true },
    end_date: { type: Date, required: true }
})

const course = new mongoose.model("course",courseSchema);
module.exports=course; 