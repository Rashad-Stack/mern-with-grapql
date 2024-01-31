import bcrypt from "bcryptjs";
import { Document, Schema, model, models } from "mongoose";
import { validateEmail } from "../lib/utils";
import Message from "./message";

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
  //   Hash the password with coast of 12
  this.password = await bcrypt.hash(this.password, 12);

  next();
});

UserSchema.pre(/^remove/, async function (next) {
  const user = this as Document; // Specify the type of 'this' as Document
  await Message.deleteMany({ user: user._id });
  next();
});

UserSchema.methods.correctPassword = async function (
  candidatePassword: string,
  userPassword: string,
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

const User = models.User || model("User", UserSchema);

export default User;
