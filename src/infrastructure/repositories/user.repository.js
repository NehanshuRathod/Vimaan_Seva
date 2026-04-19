import { User } from "../models/user.model.js";
import { ApiError } from "../../utils/ApiError.js";

const create = async (userData) => {
    return await User.create(userData);
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
    const updatedData = await User.findByIdAndUpdate(
        userId, 
        userData, 
        { new: true }
    );
    
    if(!updatedData) {
        throw new ApiError(404, "User not found, error updating data");
    }
    
    return updatedData;
};

const remove = async (userId) => {
    const deleted = await User.findByIdAndDelete(userId);
    
    if(!deleted) {
        throw new ApiError(404, "User not found");
    }
    
    return deleted;
};

export default {
    create,
    findByUsername,
    findByIdOrThrow,
    update,
    remove,
};
