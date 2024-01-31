import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { Document, Schema, model, models } from "mongoose";
import { validateEmail } from "../lib/utils";
import Message from "./message";

dotenv.config();

const UserSchema = new Schema(
  {
    email: {
      type: String,
      unique: true,
      required: [true, "Email is required"],
      validate: [validateEmail, "Please fill a valid email address"],
    },
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    username: { type: String, unique: true },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    age: {
      type: Number,
      required: [true, "Age is required"],
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
  },
  { timestamps: true },
);

UserSchema.pre("save", async function (next) {
  const salt = bcrypt.genSaltSync(10);
  this.password = bcrypt.hashSync(this.password, salt);

  next();
});

UserSchema.pre(/^remove/, async function (next) {
  const user = this as Document; // Specify the type of 'this' as Document
  await Message.deleteMany({ user: user._id });
  next();
});

UserSchema.methods.comparePassword = async function (
  candidatePassword: string,
) {
  return await bcrypt.compare(candidatePassword, this.password);
};

UserSchema.methods.generateAuthToken = function () {
  return jwt.sign({ id: this._id, role: this.role }, process.env.JWT_SECRET!, {
    expiresIn: process.env.JWT_EXPIRES_IN!,
  });
};

const User = models.User || model("User", UserSchema);

export default User;
