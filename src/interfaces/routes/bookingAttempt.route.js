import express from "express";
import {
    createAttemptCont,
    getRecentAttemptsCountCont,
} from "../controllers/bookingAttempt.controller.js";

const router = express.Router();

router.route("/").post(createAttemptCont);
router.route("/flight/:userId/:flightId/count").get(getRecentAttemptsCountCont);

export default router;
