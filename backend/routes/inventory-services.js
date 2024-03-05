import Inventory from "../models/inventory.js";
import Category from "../models/category.js";
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

async function findCategoryById(_id) {
  console.log(_id);
  const category = await Category.findOne({ _id });
  console.log(category);
  return category;
}

async function findInventoryByCategory(Category) {
  return Inventory.find({ _id: { $in: Category.inventory } });
}

function addItemToInventory(item) {
  const newItem = new Inventory(item);
  return newItem.save();
}

function deleteItemFromInventory(itemId) {
  return Inventory.findByIdAndDelete(itemId);
}

function searchInventory(searchTerm) {
  return Inventory.find({ name: { $regex: new RegExp(searchTerm, "i") } });
}

function updateItemInInventory(itemId, updatedData) {
  return Inventory.findByIdAndUpdate(itemId, updatedData, { new: true });
}

export default {
  // getInventory,
  findCategoryById,
  findInventoryByCategory,
  addItemToInventory,
  deleteItemFromInventory,
  searchInventory,
  updateItemInInventory,
};
