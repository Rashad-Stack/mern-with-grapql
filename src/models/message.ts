import { Schema, model, models } from "mongoose";

const MessageSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User is required"],
    },
    message: {
      type: String,
      required: [true, "Message is required"],
    },
  },
  { timestamps: true },
);

const Message = models.Message || model("Message", MessageSchema);

export default Message;
