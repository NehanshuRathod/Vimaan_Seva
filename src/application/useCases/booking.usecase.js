import bookingRepository from "../../infrastructure/repositories/booking.repository.js";
import bookingAttemptRepository from "../../infrastructure/repositories/bookingAttempt.repository.js";
import flightRepository from "../../infrastructure/repositories/flight.repository.js";
import walletRepository from "../../infrastructure/repositories/wallet.repository.js";
import userRepository from "../../infrastructure/repositories/user.repository.js";
import Flight from "../../domain/entities/Flight.js";
import { ApiError } from "../../utils/ApiError.js";

const calculateFinalPrice = async (flightId, flightData) => {
    // Count recent attempts for surge pricing
    const recentAttempts = await bookingAttemptRepository.countRecent(
        flightId,
        5
    );

    // Calculate surge price
    const flight = new Flight(flightData);
    return flight.calculateSurgePrice(recentAttempts);
};

const generatePNR = () => {
    return "PNR" + Date.now() + Math.floor(Math.random() * 1000);
};

const doTransaction = async (userId, flightId, isBooking = false) => {
    const flightData = await flightRepository.findByIdOrThrow(flightId);

    const finalPrice = await calculateFinalPrice(flightId, flightData);

    const balance = await walletRepository.getBalance(userId);

    if (finalPrice > balance) {
        throw new ApiError(
            401,
            "Insufficient Balance. Please add funds to your wallet to complete this booking."
        );
    }

    if (isBooking) {
        await walletRepository.updateBalance(userId, balance - finalPrice);
    }

    return finalPrice;
};

const createBooking = async (userId, flightId, passengerName) => {
    // Validate user and flight
    await userRepository.findByIdOrThrow(userId);

    const flightData = await flightRepository.findByIdOrThrow(flightId);

    // Record booking attempt
    await bookingAttemptRepository.create(userId, flightId);

    const finalPrice = await doTransaction(userId, flightId);

    const booking = {
        userDetails: userId,
        flightDetails: flightData,
        passengerDetails: passengerName,
        amountToBePaid: finalPrice,
        bookingDate: new Date(),
    };

    return booking;
};

const bookTicket = async (userId, flightId, passengerName) => {
    // Validate user and flight exist
    await userRepository.findByIdOrThrow(userId);
    await flightRepository.findByIdOrThrow(flightId);

    // Generate PNR and save booking
    const pnr = generatePNR();

    const amountPaid = await doTransaction(userId, flightId, true);

    const booking = await bookingRepository.create({
        userId,
        flightDetails: flightId,
        amountPaid,
        passengerName,
        PNR: pnr,
    });

    return booking;
};

const getBookingById = async (bookingId) => {
    const booking = await bookingRepository.findById(bookingId);

    if (!booking) {
        throw new ApiError(404, "Booking not found");
    }

    return booking;
};

const getBookingByPNR = async (pnr) => {
    const booking = await bookingRepository.findByPNR(pnr);

    if (!booking) {
        throw new ApiError(404, "Booking not found");
    }

    return booking;
};

const getUserBookingHistory = async (userId, page = 1, limit = 5) => {
    await userRepository.findByIdOrThrow(userId);

    return await bookingRepository.findByUserId(userId, page, limit);
};

export {
    createBooking,
    bookTicket,
    getBookingById,
    getBookingByPNR,
    getUserBookingHistory,
};
