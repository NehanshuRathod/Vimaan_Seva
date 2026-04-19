import express from "express";
import {
    createBookingCont,
    bookTicketCont,
    getBookingByIdCont,
    getBookingByPNRCont,
    getUserBookingHistoryCont,
} from "../controllers/booking.controller.js";

const router = express.Router();

router.route("/user/:userId/history").get(getUserBookingHistoryCont);
router.route("/pnr/:pnr").get(getBookingByPNRCont);
router.route("/:userId/:flightId/:passengerName").get(createBookingCont);
router.route("/").post(bookTicketCont);
router.route("/:id").get(getBookingByIdCont);

export default router;
