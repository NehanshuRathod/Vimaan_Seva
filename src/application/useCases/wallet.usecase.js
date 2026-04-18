import walletRepository from "../../infrastructure/repositories/wallet.repository.js";
import userRepository from "../../infrastructure/repositories/user.repository.js";
import { ApiError } from "../../utils/ApiError.js";

const createWallet = async (userId) => {
    await userRepository.findByIdOrThrow(userId);

    const existingWallet = await walletRepository.findByUserId(userId);

    if (existingWallet) {
        throw new ApiError(400, "Wallet already exists for this user");
    }

    return await walletRepository.create(userId);
};

const getWalletBalance = async (userId) => {
    await userRepository.findByIdOrThrow(userId);

    const wallet = await walletRepository.findByUserId(userId);

    if (!wallet) {
        throw new ApiError(404, "Wallet not found for this user");
    }

    return wallet;
};

const deductFromWallet = async (userId, amount) => {
    await userRepository.findByIdOrThrow(userId);

    const wallet = await walletRepository.findByUserId(userId);

    if (!wallet) {
        throw new ApiError(404, "Wallet not found");
    }

    if (wallet.balance < amount) {
        throw new ApiError(400, "Insufficient wallet balance");
    }

    const newBalance = wallet.balance - amount;
    return await walletRepository.updateBalance(userId, newBalance);
};

const addToWallet = async (userId, amount) => {
    await userRepository.findByIdOrThrow(userId);

    const wallet = await walletRepository.findByUserId(userId);

    if (!wallet) {
        throw new ApiError(404, "Wallet not found");
    }

    const newBalance = wallet.balance + amount;
    return await walletRepository.updateBalance(userId, newBalance);
};

export { createWallet, getWalletBalance, deductFromWallet, addToWallet };
