import { Schema, model, models } from "mongoose";
import { validateEmail } from "../lib/utils";

const UserSchema = new Schema(
  {
    email: {
      type: String,
      unique: true,
      validate: [validateEmail, "Please fill a valid email address"],
    },
    name: String,
    username: { type: String, unique: true },
    password: String,
    role: { enum: ["admin", "user"] },
  },
  { timestamps: true },
);

const User = models.User || model("User", UserSchema);

export default User;
