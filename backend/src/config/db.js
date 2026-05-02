import mongoose from "mongoose";

export async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("CONNECTED TO DATABSE MONGODB");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}
