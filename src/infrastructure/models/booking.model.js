import mongoose, { Schema } from "mongoose";

const bookingSchema = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        flightDetails: {
            type: Schema.Types.ObjectId,
            ref: "Flight",
            required: true,
        },

        amountPaid: {
            type: Number,
            required: true,
        },

        bookingDate: {
            type: Date,
            default: Date.now,
        },

        PNR: {
            type: String,
            required: true,
            unique: true,
        },
    },
    { timestamps: true }
);

export const Booking = mongoose.model("Booking", bookingSchema);
