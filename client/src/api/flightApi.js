import axiosClient from "./axiosClient.js";

export class FlightService {
    async getAllFlights(page = 1, limit = 10) {
        try {
            return await axiosClient.get("/flights", {
                params: { page, limit },
            });
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async searchFlights(departureCity, arrivalCity) {
        try {
            return await axiosClient.get("/flights/search", {
                params: { departureCity, arrivalCity },
            });
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async getFlightById(flightId) {
        try {
            return await axiosClient.get(`/flights/${flightId}`);
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async getFlightPrice(flightId) {
        try {
            return await axiosClient.get(`/flights/${flightId}/price`);
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async createFlight({ airline, departureCity, arrivalCity, basePrice }) {
        try {
            return await axiosClient.post("/flights", {
                airline,
                departureCity,
                arrivalCity,
                basePrice,
            });
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}

const flightService = new FlightService();
export default flightService;
