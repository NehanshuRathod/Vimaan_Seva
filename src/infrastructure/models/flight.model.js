import mongoose, { Schema } from "mongoose";
import { indianCities } from "../../constants.js";

const flightSchema = new Schema(
    {
        airline: {
            type: String,
            required: true,
        },
        departureCity: {
            type: String,
            required: true,
            enum: {
                values: indianCities,
                message: "{VALUE} is not a supported city",
            },
        },
        arrivalCity: {
            type: String,
            required: true,
            enum: {
                values: indianCities,
                message: "{VALUE} is not a supported city",
            },
        },
        basePrice: {
            type: Number,
            default: 2000,
        },
    },
    { timestamps: true }
);

export const Flight = mongoose.model("Flight", flightSchema);
