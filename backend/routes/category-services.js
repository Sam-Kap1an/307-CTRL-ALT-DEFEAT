import Location from "../models/location.js";
import Category from "../models/category.js";
import inventoryServices from "../routes/inventory-services.js";
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

async function findLocationById(_id) {
  console.log(_id);
  const location = await Location.findOne({ _id });
  console.log(location);
  return location;
}

async function findCategoryByLocation(Location) {
  return Category.find({ _id: { $in: Location.categories } });
}

async function findCategoryById(_id) {
  const category = Category.findOne({ _id });
  return category;
}

async function countItems(category) {
  let totalItems = category.inventory.length;
  let lowItems = 0;
  let highItems = 0;

  for (const inventoryId of category.inventory) {
    const inventory = await inventoryServices.findInventoryById(inventoryId);
    if (
      parseFloat(inventory.quantity) >= parseFloat(inventory.minimumThreshold)
    ) {
      highItems++;
    } else {
      lowItems++;
    }
  }
  return { totalItems, lowItems, highItems };
}

async function addCategory(category) {
  const newCategory = new Category(category);
  return newCategory.save();
}

function removeCategoryFromLocation(locationId, categoryId) {
  return Location.updateOne(
    { _id: locationId },
    { $pull: { categories: categoryId } },
  );
}

function deleteCategory(categoryId) {
  return Category.findByIdAndDelete(categoryId);
}

export default {
  findLocationById,
  findCategoryByLocation,
  addCategory,
  deleteCategory,
  removeCategoryFromLocation,
  findCategoryById,
  countItems,
};
