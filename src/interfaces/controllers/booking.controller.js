import { asyncHandler } from "../../utils/asyncHandler.js";
import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { isIdValid } from "../../infrastructure/database/databaseIdValidations.js";
import {
    bookTicket,
    createBooking,
    getBookingById,
    getBookingByPNR,
    getUserBookingHistory,
} from "../../application/useCases/booking.usecase.js";

const createBookingCont = asyncHandler(async (req, res) => {
    const { userId, flightId, passengerName } = req.body;

    if (!userId || !flightId || !passengerName) {
        throw new ApiError(
            400,
            "User ID, Flight ID, and Passenger Name are required"
        );
    }

    isIdValid(userId);
    isIdValid(flightId);

    const booking = await createBooking(userId, flightId, passengerName);

    return res
        .status(201)
        .json(new ApiResponse(201, booking, "Booking created successfully"));
});

const bookTicketCont = asyncHandler(async (req, res) => {
    const { userId, flightId, passengerName } = req.body;

    if (!userId || !flightId || !passengerName) {
        throw new ApiError(
            400,
            "User ID, Flight ID, and Passenger Name are required"
        );
    }

    isIdValid(userId);
    isIdValid(flightId);

    const booking = await bookTicket(userId, flightId, passengerName);

    return res
        .status(201)
        .json(new ApiResponse(201, booking, "Ticket booked succesfully"));
});

const getBookingByIdCont = asyncHandler(async (req, res) => {
    const { id: bookingId } = req.params;

    isIdValid(bookingId);

    const booking = await getBookingById(bookingId);

    return res
        .status(200)
        .json(new ApiResponse(200, booking, "Booking fetched successfully"));
});

const getBookingByPNRCont = asyncHandler(async (req, res) => {
    const { pnr } = req.params;

    if (!pnr) {
        throw new ApiError(400, "PNR is required");
    }

    const booking = await getBookingByPNR(pnr);

    return res
        .status(200)
        .json(new ApiResponse(200, booking, "Booking fetched successfully"));
});

const getUserBookingHistoryCont = asyncHandler(async (req, res) => {
    const { userId } = req.params;

    isIdValid(userId);

    const bookings = await getUserBookingHistory(userId);

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                bookings,
                "Booking history fetched successfully"
            )
        );
});

export {
    createBookingCont,
    bookTicketCont,
    getBookingByIdCont,
    getBookingByPNRCont,
    getUserBookingHistoryCont,
};
