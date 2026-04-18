import express from "express";
import {
    createBookingCont,
    bookTicketCont,
    getBookingByIdCont,
    getBookingByPNRCont,
    getUserBookingHistoryCont,
} from "../controllers/booking.controller.js";

const router = express.Router();

router.route("/").get(createBookingCont).post(bookTicketCont);
router.route("/:id").get(getBookingByIdCont);
router.route("/pnr/:pnr").get(getBookingByPNRCont);
router.route("/user/:userId/history").get(getUserBookingHistoryCont);

export default router;
