import { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    name: { type: String, default: "" },
    email: { type: String, default: "" },
    image: { type: String, default: "" },
    phone: { type: String, default: "" },
    password: { type: String, default: "" },
    role: {
      type: String,
      enum: ["admin", "student", "teacher"],
      default: "student",
    },
  },
  { timestamps: true }
);

export = model("User", userSchema);
