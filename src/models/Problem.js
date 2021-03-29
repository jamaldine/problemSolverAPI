import mongoose from "mongoose";

// src/models/card/model.ts

const Schema = new mongoose.Schema(
    {
        title: String,
        description: String,
        media: String,
    },
    // Adds createdAt and updatedAt to the model
    { timestamps: true }
)

export const Problem =  mongoose.model('Problem', Schema)

/**
 * other way
 * export const Problem = mongoose.model("Problem", { title: String, description: String, media: String });
 */