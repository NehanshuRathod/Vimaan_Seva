import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true,
        },
        fullname: {
            type: String,
            required: true,
            trim: true,
        },
        age: {
            type: Number,
            required: true,
            min: [18, "Age must be at least 18"],
            max: [100, "Age must not exceed 100"],
        },
        gender: {
            type: String,
            required: true,
            enum: {
                values: ["male", "female", "other"],
                message: "{VALUE} is not a valid gender",
            },
        },
    },
    { timestamps: true }
);

export const User = mongoose.model("User", userSchema);
