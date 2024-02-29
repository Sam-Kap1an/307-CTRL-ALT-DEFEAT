import User from "../models/user.js";
import mongoose from "mongoose";
import dotenv from "dotenv";

mongoose.set("debug", true);

dotenv.config();

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

async function addNewUser(name, email, hashedPassword) {
  try {
    const newUser = new User({ name, email, hashedPassword });
    await newUser.save();
    console.log("User added successfully.");
    return newUser;
  } catch (error) {
    console.error("Error adding new user:", error);
    throw error;
  }
}

async function findUserByEmail(email) {
  return User.findOne({ email });
}

export default {
  addNewUser,
  findUserByEmail,
};
