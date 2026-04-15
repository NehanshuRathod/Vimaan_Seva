import { BookingAttempt } from "../models/bookingAttempt.model.js";

const create = async (flightId) => {
    return await BookingAttempt.create({ flightId });
};

const countRecent = async (flightId, minutes) => {
    const since = new Date(Date.now() - minutes * 60 * 1000);
    return await BookingAttempt.countDocuments({
        flightId,
        attemptedAt: { $gte: since }
    });
};

export default { create, countRecent };