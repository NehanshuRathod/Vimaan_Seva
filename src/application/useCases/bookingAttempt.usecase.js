import bookingAttemptRepository from "../../infrastructure/repositories/bookingAttempt.repository.js";
import userRepository from "../../infrastructure/repositories/user.repository.js";
import flightRepository from "../../infrastructure/repositories/flight.repository.js";

const createAttempt = async (userId, flightId) => {
    await userRepository.findByIdOrThrow(userId);

    await flightRepository.findByIdOrThrow(flightId);

    return await bookingAttemptRepository.create(userId, flightId);
};

const getRecentAttemptsCount = async (flightId, minutes = 5) => {
    await flightRepository.findByIdOrThrow(flightId);

    return await bookingAttemptRepository.countRecent(
        flightId,
        minutes
    );
};

export { createAttempt, getRecentAttemptsCount };
