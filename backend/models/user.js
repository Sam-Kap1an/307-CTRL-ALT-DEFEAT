import mongoose from "mongoose";
import Location from "./location";

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      trim: true,
    },
    locations: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Location",
        required: false,
      },
    ],
  },
  { collection: "users" }
);

const User = mongoose.model("User", UserSchema);

export default User;

