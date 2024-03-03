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
  return Location.find({ _id: { $in: User.locations } }).select("name");
}

export default {
  findByEmail,
  findLocationsByUser,
};

// function getInventory(searchQuery) {
//   // Use a regex to perform case-insensitive search
//   const regex = new RegExp(searchQuery, "i");
//   return Inventory.find({ name: regex });
// }

// function addItemToInventory(item) {
//   const newItem = new Inventory(item);
//   return newItem.save();
// }

// function deleteItemFromInventory(itemId) {
//   return Inventory.findByIdAndDelete(itemId);
// }

// function searchInventory(searchTerm) {
//   return Inventory.find({ name: { $regex: new RegExp(searchTerm, "i") } });
// }

// function updateItemInInventory(itemId, updatedData) {
//   return Inventory.findByIdAndUpdate(itemId, updatedData, { new: true });
// }

// export default {
//   getInventory,
//   addItemToInventory,
//   deleteItemFromInventory,
//   searchInventory,
//   updateItemInInventory,
// };
