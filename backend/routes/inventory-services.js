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

async function findInventoryById(_id) {
  return Inventory.findOne({ _id });
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

function removeInventoryFromCategory(categoryId, inventoryId) {
  return Category.updateOne(
    { _id: categoryId },
    { $pull: { inventory: inventoryId } },
  );
}

export default {
  findCategoryById,
  findInventoryByCategory,
  addItemToInventory,
  deleteItemFromInventory,
  searchInventory,
  updateItemInInventory,
  removeInventoryFromCategory,
  findInventoryById,
};
