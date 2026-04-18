import { User } from "../models/user.model.js";
import { ApiError } from "../../utils/ApiError.js";

const create = async (userData) => {
    return await User.create(userData);
};

const findById = async (userId) => {
    return await User.findById(userId);
};

const findByUsername = async (username) => {
    return await User.findOne({ username });
};

const findByIdOrThrow = async (userId) => {
    const user = await User.findById(userId);
    if (!user) {
        throw new ApiError(404, "User not found");
    }
    return user;
};

const update = async (userId, userData) => {
    return await User.findByIdAndUpdate(userId, userData, { new: true });
};

const remove = async (userId) => {
    return await User.findByIdAndDelete(userId);
};

export default {
    create,
    findById,
    findByUsername,
    findByIdOrThrow,
    update,
    remove,
};
