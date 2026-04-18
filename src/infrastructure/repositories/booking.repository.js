import mongoose from "mongoose";
import { Booking } from "../models/booking.model.js";

const create = async (bookingData) => {
    return await Booking.create(bookingData);
};

const findByPNR = async (pnr) => {
    return await Booking.findOne({ PNR: pnr }).populate("flightDetails");
};

const findByUserId = async (userId, page = 1, limit = 5) => {
    const aggregate = Booking.aggregate([
        { $match: { userId: new mongoose.Types.ObjectId(userId) } },
        { $sort: { createdAt: -1 } },
        {
            $lookup: {
                from: "flights",
                localField: "flightDetails",
                foreignField: "_id",
                as: "flightDetails",
            },
        },
        { $unwind: "$flightDetails" },
    ]);

    const options = {
        page,
        limit,
        customLabels: {
            docs: "bookings",
            totalDocs: "totalItems",
        },
    };

    return await Booking.aggregatePaginate(aggregate, options);
};

const findById = async (bookingId) => {
    return await Booking.findById(bookingId).populate("flightDetails");
};

export default { create, findByPNR, findByUserId, findById };
