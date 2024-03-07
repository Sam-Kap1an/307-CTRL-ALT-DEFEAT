import Location from "../models/location.js";
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

async function findByEmail(email) {
  const user = await User.findOne({ email });
  console.log(user);
  return user;
}

async function findLocationsByUser(User) {
  return Location.find({ _id: { $in: User.locations } });
}

async function deleteItemFromLocations(ID) {
  console.log(`loc services call on delete id: ${ID}`);
  return Location.deleteOne({ _id: ID });
}

function addLocation(location) {
  const newLocation = new Location(location);
  return newLocation.save();
}

export default {
  findByEmail,
  findLocationsByUser,
  addLocation,
  deleteItemFromLocations,
};
