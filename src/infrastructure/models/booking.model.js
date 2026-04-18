import mongoose, { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

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

        passengerName: {
            type: String,
            required: true,
        },

        PNR: {
            type: String,
            required: true,
            unique: true,
        },
    },
    { timestamps: true }
);

bookingSchema.plugin(mongooseAggregatePaginate);

export const Booking = mongoose.model("Booking", bookingSchema);
