import { Flight } from "../models/flight.model.js";

const create = async (flightData) => {
    return await Flight.create(flightData);
};

const findById = async (flightId) => {
    return Flight.findById(flightId);
};

const findByIdOrThrow = async (flightId) => {
    const flight = await findById(flightId);
    if (!flight) {
        throw new ApiError(404, "Flight not found");
    }

    return flight;
};

const findAll = async (page = 1, limit = 10) => {
    const aggregate = Flight.aggregate([]);
    const options = {
        page,
        limit,
        customLabels: {
            docs: "flights",
            totalDocs: "totalItems",
        },
    };
    return await Flight.aggregatePaginate(aggregate, options);
};

const update = async (flightId, flightData) => {
    return Flight.findByIdAndUpdate(flightId, flightData);
};

const remove = async (flightId) => {
    return await Flight.findByIdAndDelete(flightId);
};

const search = async ({ departureCity, arrivalCity }) => {
    return await Flight.find({ departureCity, arrivalCity }).limit(10);
};

const flightRepository = {
    create,
    findById,
    findByIdOrThrow,
    findAll,
    update,
    remove,
    search,
};
export default flightRepository;
