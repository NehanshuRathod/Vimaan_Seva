import mongoose, { Schema } from "mongoose";

const walletSchema = new Schema(
    {
        balance: {
            type: Number,
            default: 50000.00,
            min: 0
        }
    }, {timestamps: true});

export const Wallet = mongoose.model("Wallet", walletSchema);