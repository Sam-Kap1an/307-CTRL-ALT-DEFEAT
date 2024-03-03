import mongoose from "mongoose";

const InventorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    quantity: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    minimumThreshold: {
<<<<<<< HEAD
      type: String,
=======
      type: String, // Change the type to String
>>>>>>> main
      required: true,
    },
  },
  { collection: "inventory" },
);

const Inventory = mongoose.model("Inventory", InventorySchema);

export default Inventory;
