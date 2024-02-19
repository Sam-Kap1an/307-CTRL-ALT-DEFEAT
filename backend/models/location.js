import mongoose from "mongoose";
import Category from "./category";

const LocationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    categories: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: false,
      },
    ],
  },
  { collection: "locations" }
);

const Location = mongoose.model("Location", LocationSchema);

export default Location;
