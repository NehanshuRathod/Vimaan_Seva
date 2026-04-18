import axiosClient from "./axiosClient.js";

export class UserService {
    async createUser({ username, fullname, age, gender }) {
        try {
            return await axiosClient.post("/users", {
                username,
                fullname,
                age,
                gender,
            });
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async getUserById(userId) {
        try {
            return await axiosClient.get(`/users/${userId}`);
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async updateUser(userId, { username, fullname, age, gender }) {
        try {
            return await axiosClient.put(`/users/${userId}`, {
                username,
                fullname,
                age,
                gender,
            });
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async deleteUser(userId) {
        try {
            return await axiosClient.delete(`/users/${userId}`);
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}

const userService = new UserService();
export default userService;
