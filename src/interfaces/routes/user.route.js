import express from "express";
import {
    createUserCont,
    getUserCont,
    updateUserCont,
    deleteUserCont,
} from "../controllers/user.controller.js";

const router = express.Router();

router.route("/").post(createUserCont);
router.route("/:id").get(getUserCont).patch(updateUserCont).delete(deleteUserCont);

export default router;