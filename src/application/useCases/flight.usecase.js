import flightRepository from "../../infrastructure/repositories/flight.repository.js";
import { isIdValid } from "../../infrastructure/database/databaseIdValidations.js";

const createFlight = async (flightData) => {
    return await flightRepository.create(flightData);
};

const getAllFlights = async () => {
    return await flightRepository.findAll();
};

const searchFlights = async (flightPath) => {
    return await flightRepository.search(flightPath);
};

const getFlight = async (flightId) => {
    return await flightRepository.findById(flightId);
};

const getFlightPrice = async (flightId) => {
    const flight = await flightRepository.findById(flightId);

    return flight.basePrice;
};

export {
    createFlight,
    getAllFlights,
    searchFlights,
    getFlight,
    getFlightPrice,
    isIdValid,
};
