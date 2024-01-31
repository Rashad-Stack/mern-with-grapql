import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

// const DB = process.env.MONGODB_DATABASE_URL!.replace(
//   "<password>",
//   process.env.MONGODB_DATABASE_PASSWORD!,
// );

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URL!, {
      minPoolSize: 1,
      maxPoolSize: 20,
      socketTimeoutMS: 60000,
      serverSelectionTimeoutMS: 60000,
    });
  } catch (error) {
    console.log(error);
  }
};
