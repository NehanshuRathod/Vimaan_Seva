import { asyncHandler } from "../../utils/asyncHandler.js";
import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { isIdValid } from "../../infrastructure/database/databaseIdValidations.js";
import {
    createWallet,
    getWalletBalance,
    deductFromWallet,
    addToWallet,
} from "../../application/useCases/wallet.usecase.js";

const createWalletCont = asyncHandler(async (req, res) => {
    const { userId } = req.body;

    if (!userId) {
        throw new ApiError(400, "User ID is required");
    }

    isIdValid(userId);

    const wallet = await createWallet(userId);

    return res
        .status(201)
        .json(new ApiResponse(201, wallet, "Wallet created successfully"));
});

const getWalletBalanceCont = asyncHandler(async (req, res) => {
    const { userId } = req.params;

    isIdValid(userId);

    const wallet = await getWalletBalance(userId);

    return res
        .status(200)
        .json(
            new ApiResponse(200, wallet, "Wallet balance fetched successfully")
        );
});

const deductFromWalletCont = asyncHandler(async (req, res) => {
    const { userId } = req.params;
    const { amount } = req.body;

    isIdValid(userId);

    if (!amount || amount <= 0) {
        throw new ApiError(400, "Valid amount is required");
    }

    const wallet = await deductFromWallet(userId, amount);

    return res
        .status(200)
        .json(new ApiResponse(200, wallet, "Amount deducted successfully"));
});

const addToWalletCont = asyncHandler(async (req, res) => {
    const { userId } = req.params;
    const { amount } = req.body;

    isIdValid(userId);

    if (!amount || amount <= 0) {
        throw new ApiError(400, "Valid amount is required");
    }

    const wallet = await addToWallet(userId, amount);

    return res
        .status(200)
        .json(new ApiResponse(200, wallet, "Amount added successfully"));
});

export {
    createWalletCont,
    getWalletBalanceCont,
    deductFromWalletCont,
    addToWalletCont,
};
