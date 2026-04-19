import axiosClient from "./axiosClient.js";

export class WalletService {
    async createWallet(userId) {
        try {
            return await axiosClient.post("/wallet", { userId });
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async getWalletBalance(userId) {
        try {
            return await axiosClient.get(`/wallet/${userId}`);
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async addFunds(userId, amount) {
        try {
            return await axiosClient.patch(`/wallet/${userId}/add`, { amount });
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async deductFunds(userId, amount) {
        try {
            return await axiosClient.patch(`/wallet/${userId}/deduct`, {
                amount,
            });
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}

const walletService = new WalletService();
export default walletService;
