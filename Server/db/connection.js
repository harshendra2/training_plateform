const mongoose = require("mongoose");

 const DB = process.env.DATABASE;

mongoose
  .connect('mongodb://localhost:27017/courseregistration')
  .then(() => console.log("Database connected"))
  .catch((error) => {
    console.log("Error:", error);
  });
