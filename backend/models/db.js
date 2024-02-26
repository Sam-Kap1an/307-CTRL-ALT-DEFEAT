import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

mongoose.set("debug", true);

mongoose
  .connect(process.env.MONGO_URI, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((error) => console.log(error));
