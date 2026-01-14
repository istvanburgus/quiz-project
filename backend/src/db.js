import mongoose from "mongoose";

export async function connectDB(uri) {
  // Yhdistetään MongoDB:hen
  await mongoose.connect(uri);
  console.log("MongoDB connected");
}