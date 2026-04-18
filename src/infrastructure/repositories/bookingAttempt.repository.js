import { BookingAttempt } from "../models/bookingAttempt.model.js";

const create = async (userId, flightId) => {
    return await BookingAttempt.create({ userId, flightId });
};

const countRecent = async (flightId, minutes) => {
    const since = new Date(Date.now() - minutes * 60 * 1000);
    return await BookingAttempt.countDocuments({
        flightId,
        attemptedAt: { $gte: since },
    });
};

const countRecentByUser = async (userId, flightId, minutes) => {
    const since = new Date(Date.now() - minutes * 60 * 1000);
    return await BookingAttempt.countDocuments({
        userId,
        flightId,
        attemptedAt: { $gte: since },
    });
};

const getByUser = async (userId) => {
    return await BookingAttempt.find({ userId }).sort({ attemptedAt: -1 });
};

const getByFlight = async (flightId) => {
    return await BookingAttempt.find({ flightId }).sort({ attemptedAt: -1 });
};

export default {
    create,
    countRecent,
    countRecentByUser,
    getByUser,
    getByFlight,
};
