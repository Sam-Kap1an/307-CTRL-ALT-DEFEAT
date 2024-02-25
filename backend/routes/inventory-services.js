import Inventory from "../models/inventory.js";
import mongoose from "mongoose";

mongoose.set("debug", true);

mongoose
  .connect("mongodb://localhost:27017/inventory", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

  function getInventory(searchQuery) {
    // Use a regex to perform case-insensitive search
    const regex = new RegExp(searchQuery, 'i');
    return Inventory.find({ name: regex });
  }
  
  function addItemToInventory(item) {
    const newItem = new Inventory(item);
    return newItem.save();
  }
  
  function deleteItemFromInventory(itemId) {
    return Inventory.findByIdAndDelete(itemId);
  }

  function searchInventory(searchTerm) {
    return Inventory.find({ name: { $regex: new RegExp(searchTerm, 'i') } });
  }

  function updateItemInInventory(itemId, updatedData) {
    return Inventory.findByIdAndUpdate(itemId, updatedData, { new: true });
  }
  
  export default {
    getInventory,
    addItemToInventory,
    deleteItemFromInventory,
    searchInventory,
    updateItemInInventory,
  };
