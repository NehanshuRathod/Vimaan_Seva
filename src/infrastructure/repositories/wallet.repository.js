import { Wallet } from "../models/wallet.model.js";

const findByUserId = async (userId) => {
    return await Wallet.findOne({ userId });
};

const create = async (userId) => {
    return await Wallet.create({ userId, balance: 50000 });
};

const updateBalance = async (userId, newBalance) => {
    return await Wallet.findOneAndUpdate(
        { userId },
        { balance: newBalance },
        { new: true }
    );
};

const getBalance = async (userId) => {
    const wallet = await Wallet.findOne({ userId });
    return wallet ? wallet.balance : null;
};

export default { findByUserId, create, updateBalance, getBalance };
