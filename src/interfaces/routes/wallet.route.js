import express from "express";
import {
    createWalletCont,
    getWalletBalanceCont,
    deductFromWalletCont,
    addToWalletCont,
} from "../controllers/wallet.controller.js";

const router = express.Router();

router.route("/").post(createWalletCont);
router.route("/:userId").get(getWalletBalanceCont);
router.route("/:userId/deduct").patch(deductFromWalletCont);
router.route("/:userId/add").patch(addToWalletCont);

export default router;
