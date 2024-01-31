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

    mongoose.connection.on("connecting", () =>
      console.info("database connecting"),
    );
    mongoose.connection.on("connected", () =>
      console.log("database connected"),
    );
    mongoose.connection.on("disconnecting", () =>
      console.info("database disconnecting"),
    );
    mongoose.connection.on("disconnected", () =>
      console.info("database disconnected"),
    );
    mongoose.connection.on("error", () => console.error("database error"));
    mongoose.connection.on("close", () => console.log("close"));
  } catch (error) {
    console.log(error);
  }
};
