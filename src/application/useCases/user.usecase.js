import userRepository from "../../infrastructure/repositories/user.repository.js";
import { ApiError } from "../../utils/ApiError.js";

const createUser = async (userData) => {
    const { username } = userData;

    const existingUser = await userRepository.findByUsername(username);

    if (existingUser) {
        throw new ApiError(400, "Username already exists");
    }

    return await userRepository.create(userData);
};

const getUser = async (userId) => {
    return await userRepository.findByIdOrThrow(userId);
};

const updateUser = async (userId, userData) => {
    return await userRepository.update(userId, userData);
};

const deleteUser = async (userId) => {
    return await userRepository.remove(userId);
};

export { createUser, getUser, updateUser, deleteUser };
