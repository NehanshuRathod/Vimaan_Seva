import mongoose, { Schema } from "mongoose";

const bookingAttemptSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    flightId: {
        type: Schema.Types.ObjectId,
        ref: "Flight",
        required: true,
    },

    attemptedAt: {
        type: Date,
        default: Date.now,
        expires: 600,
    },
});

export const BookingAttempt = mongoose.model(
    "BookingAttempt",
    bookingAttemptSchema
);
