import axiosClient from "./axiosClient.js";

export class BookingAttemptService {
    async createAttempt({ userId, flightId }) {
        try {
            return await axiosClient.post("/booking-attempts", {
                userId,
                flightId,
            });
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async getRecentAttemptCount(flightId, minutes = 5) {
        try {
            return await axiosClient.get(
                `/booking-attempts/count/${flightId}`,
                {
                    params: { minutes },
                }
            );
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async getUserAttempts(userId) {
        try {
            return await axiosClient.get(`/booking-attempts/user/${userId}`);
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async getFlightAttempts(flightId) {
        try {
            return await axiosClient.get(
                `/booking-attempts/flight/${flightId}`
            );
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}

const bookingAttemptService = new BookingAttemptService();
export default bookingAttemptService;
