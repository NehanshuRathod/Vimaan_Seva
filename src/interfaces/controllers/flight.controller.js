import { asyncHandler } from "../../utils/asyncHandler.js";
import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { indianCities } from "../../constants.js";
import {
    createFlight,
    getAllFlights,
    searchFlights,
    getFlight,
    isIdValid,
    getFlightPrice,
} from "../../application/useCases/flight.usecase.js";

const validateCities = ({ departureCity, arrivalCity }) => {
    if (!departureCity || !arrivalCity) {
        throw new ApiError(
            400,
            "Departure City, and Arrival City are required fields."
        );
    }

    if (departureCity === arrivalCity) {
        throw new ApiError(
            400,
            "Departure City and Arrival City cannot be the same."
        );
    }

    if (!indianCities.includes(departureCity)) {
        throw new ApiError(400, `${departureCity} is not a supported city.`);
    }

    if (!indianCities.includes(arrivalCity)) {
        throw new ApiError(400, `${arrivalCity} is not a supported city.`);
    }
};

// Admin creates a flight
const createFlightCont = asyncHandler(async (req, res) => {
    const { airline, departureCity, arrivalCity, basePrice } = req.body;

    // Validation
    if (!airline) {
        throw new ApiError(400, "Airline is a required field.");
    }

    validateCities({ departureCity, arrivalCity });

    if (!basePrice) {
        throw new ApiError(400, "Base Price is required.");
    }

    if (basePrice < 0) {
        throw new ApiError(400, "Base Price cannot be negative.");
    }

    const response = await createFlight({
        airline,
        departureCity,
        arrivalCity,
        basePrice,
    });

    return res
        .status(201)
        .json(new ApiResponse(201, response, "Flight created successfully"));
});

// SEARCH FUNCTIONALITIES

// 1. Fetch 10 flights from DB
const getAllFlightsCont = asyncHandler(async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    if (page < 1) {
        throw new ApiError(400, "Page number must be greater than 0");
    }

    if (limit < 1 || limit > 100) {
        throw new ApiError(400, "Limit must be between 1 and 100");
    }

    const result = await getAllFlights(page, limit);

    if (result == null) {
        throw new ApiError(500, "Internal Server Error");
    }

    return res
        .status(200)
        .json(new ApiResponse(200, result, "Flights fetched successfully"));
});

// 2. Flights between cityA and cityB
const searchFlightsCont = asyncHandler(async (req, res) => {
    const { departureCity, arrivalCity } = req.query;

    validateCities({ departureCity, arrivalCity });

    const response = await searchFlights({ departureCity, arrivalCity });

    if (response == null) {
        throw new ApiError(
            404,
            `No flights available between ${departureCity} and ${arrivalCity}`
        );
    }

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                { flights: response },
                `List of flights between ${departureCity} and ${arrivalCity}`
            )
        );
});

// Single flight when user clicks on it to see details
const getFlightCont = asyncHandler(async (req, res) => {
    const { id: flightId } = req.params;

    isIdValid(flightId);

    const response = await getFlight(flightId);

    if (!response) {
        throw new ApiError(404, "Flight does not exist.");
    }

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                { flight: response },
                "Flight fetched succesfully"
            )
        );
});

// Flight price shown on the listing page
const getFlightPriceCont = asyncHandler(async (req, res) => {
    const { id: flightId } = req.params;
    isIdValid(flightId);

    const response = await getFlightPrice(flightId);

    return res
        .status(200)
        .json(new ApiResponse(200, { flightPrice: response }, ""));
});

export {
    createFlightCont,
    getAllFlightsCont,
    searchFlightsCont,
    getFlightCont,
    getFlightPriceCont,
};
