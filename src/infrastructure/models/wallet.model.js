import mongoose, { Schema } from "mongoose";

const walletSchema = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
            unique: true,
        },
        balance: {
            type: Number,
            default: 50000,
            min: [0, "Balance cannot be negative"],
        },
    },
    { timestamps: true }
);

export const Wallet = mongoose.model("Wallet", walletSchema);
