const IFlightRepository = {
    create: async (flightData) => {},
    findById: async (flightId) => {},
    findAll: async () => {},
    update: async (flightId, flightData) => {},
    remove: async (flightId) => {},
    search: async ({ departureCity, arrivalCity }) => {},
};

export default IFlightRepository;