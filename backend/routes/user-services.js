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
  const user = await User.findOne({ email });
  return user;
}

async function findLocationsByEmail(email) {
  const locations = await User.findOne({ email }).locations;
  return locations;
}


async function addLocation(email,  newLocation) {
  return await User.findOne({ email }).locations.add(newLocation);
}

export default {
  addNewUser,
  findUserByEmail,
  findLocationsByEmail,
  addLocation,
};
