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

    async ensureWalletExists(userId) {
        let flag = true;
        try {
            await this.getWalletBalance(userId);
            flag = false;
        } catch (error) {
            // if (error.response?.status === 404) {
            //     await this.createWallet(userId);
            //     return { created: true };
            // }
            throw error;
        } finally {
            if (flag) {
                await this.createWallet(userId);
            }

            return { created: flag };
        }
    }
}

const walletService = new WalletService();
export default walletService;
