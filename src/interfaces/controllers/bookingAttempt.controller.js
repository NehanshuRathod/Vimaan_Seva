import { asyncHandler } from "../../utils/asyncHandler.js";
import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { isIdValid } from "../../infrastructure/database/databaseIdValidations.js";
import {
    createAttempt,
    getRecentAttemptsCount,
} from "../../application/useCases/bookingAttempt.usecase.js";

const createAttemptCont = asyncHandler(async (req, res) => {
    const { userId, flightId } = req.body;

    if (!userId || !flightId) {
        throw new ApiError(400, "User ID and Flight ID are required");
    }

    isIdValid(userId);
    isIdValid(flightId);

    const attempt = await createAttempt(userId, flightId);

    return res
        .status(201)
        .json(
            new ApiResponse(
                201,
                attempt,
                "Booking attempt recorded successfully"
            )
        );
});

const getRecentAttemptsCountCont = asyncHandler(async (req, res) => {
    const { flightId } = req.params;

    isIdValid(flightId);

    const count = await getRecentAttemptsCount(flightId, 5);

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                { count },
                "Recent attempts count fetched successfully"
            )
        );
});

export { createAttemptCont, getRecentAttemptsCountCont };
