import express from "express";
import {
    createFlightCont,
    getAllFlightsCont,
    searchFlightsCont,
    getFlightCont,
    getFlightPriceCont,
} from "../controllers/flight.controller.js";

const router = express.Router();


router.route("/").post(createFlightCont).get(getAllFlightsCont);

router.route("/search").get(searchFlightsCont);

router.route("/:id").get(getFlightCont);

router.route("/:id/price").get(getFlightPriceCont); 

export default router;