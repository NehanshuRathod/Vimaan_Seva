import axiosClient from "./axiosClient.js";

export class BookingService {
    async createBooking({ userId, flightId, passengerName }) {
        try {
            return await axiosClient.get("/bookings", {
                params: { userId, flightId, passengerName },
            });
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async bookTicket({ userId, flightId, passengerName }) {
        try {
            return await axiosClient.post("/bookings", {
                userId,
                flightId,
                passengerName,
            });
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async getBookingById(bookingId) {
        try {
            return await axiosClient.get(`/bookings/${bookingId}`);
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async getBookingByPNR(pnr) {
        try {
            return await axiosClient.get(`/bookings/pnr/${pnr}`);
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async getUserBookingHistory(userId, page = 1, limit = 5) {
        try {
            return await axiosClient.get(`/bookings/user/${userId}/history`, {
                params: { page, limit },
            });
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}

const bookingService = new BookingService();
export default bookingService;
