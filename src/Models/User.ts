import { Schema, model } from "mongoose";

const tableSchema = new Schema(
  {
    name: { type: String, default: "" },
    username: { type: String, default: "" },
    email: { type: String, default: "" },
    image: { type: String, default: "" },
    phone: { type: String, default: "" },
    password: { type: String, default: "" },
    active: { type: Boolean, default: false },
    status: { type: String, enum: ["active", "disable"], default: "active" },
    role: { type: String, enum: ["admin", "author"], default: "author" },
  },
  { timestamps: true }
);

export = model("User", tableSchema);
