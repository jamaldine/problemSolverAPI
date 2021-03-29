import mongoose from "mongoose";

const Schema = new mongoose.Schema(
  {
    name: String,
    lastname: String,
    email: String,
    password: String,
    avatar: String,
    
  },
  { timestamps: true }
);

export const Solver = mongoose.model("Solver", Schema);
