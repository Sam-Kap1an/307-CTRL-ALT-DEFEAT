import mongoose from "mongoose";
//import dotenv from "dotenv";

require("dotenv").config();

mongoose.set("debug", true);

console.log(process.env.MONGO_URI);

mongoose
  .connect(process.env.MONGO_URI, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((error) => console.log(error));
