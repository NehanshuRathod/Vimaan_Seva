import { Booking } from "../models/booking.model.js";

const create = async (bookingData) => {
    return await Booking.create(bookingData);
};

const findByPNR = async (pnr) => {
    return await Booking.findOne({ PNR: pnr }).populate("flightDetails");
};

const findByUserId = async (userId) => {
    return await Booking.find({ userId })
        .populate("flightDetails")
};

const findById = async (bookingId) => {
    return await Booking.findById(bookingId).populate("flightDetails");
};

export default { create, findByPNR, findByUserId, findById };
