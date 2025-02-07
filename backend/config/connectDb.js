import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const connectDB = async () => {
  try {``
    const url = process.env.MONGODB_URI;
    await mongoose.connect(url);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log(`Error connecting to db : ${error}`);
    process.exit(1);
  }
};

export default connectDB;
