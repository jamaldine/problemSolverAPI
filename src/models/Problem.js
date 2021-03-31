import mongoose from "mongoose";

const Schema = new mongoose.Schema(
  {
    title: String,
    description: String,
    media: String,
  },
  { timestamps: true }
);

const Problem = mongoose.model("Problem", Schema);

module.exports = {
  Problem,
};
