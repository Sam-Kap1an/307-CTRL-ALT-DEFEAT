import mongoose from "mongoose";
import Location from "./location.js";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    hashedPassword: {
      type: String,
      required: true,
    },
    locations: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: Location,
        required: false,
      },
    ],
  },
  { collection: "users" },
);

const User = mongoose.model("User", UserSchema);

export default User;
