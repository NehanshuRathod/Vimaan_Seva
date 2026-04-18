import { asyncHandler } from "../../utils/asyncHandler.js";
import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { isIdValid } from "../../infrastructure/database/databaseIdValidations.js";
import {
    createUser,
    getUser,
    updateUser,
    deleteUser,
} from "../../application/useCases/user.usecase.js";

const createUserCont = asyncHandler(async (req, res) => {
    const { username, fullname, age, gender } = req.body;

    if (!username || !fullname || !age || !gender) {
        throw new ApiError(
            400,
            "Username, fullname, age, and gender are required"
        );
    }

    const user = await createUser({ username, fullname, age, gender });

    return res
        .status(201)
        .json(
            new ApiResponse(
                201,
                user,
                "User created successfully"
            )
        );
});

const getUserCont = asyncHandler(async (req, res) => {
    const { id: userId } = req.params;

    isIdValid(userId);

    const user = await getUser(userId);
    
    if (!user) {
        throw new ApiError(404, "User not found");
    }

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                user,
                "User fetched successfully"
            )
        );
});

const updateUserCont = asyncHandler(async (req, res) => {
    const { id: userId } = req.params;
    const updateData = req.body;

    isIdValid(userId);
    
    const user = await updateUser(userId, updateData);

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                user,
                "User updated successfully"
            )
        );
});

const deleteUserCont = asyncHandler(async (req, res) => {
    const { id: userId } = req.params;

    isIdValid(userId);

    await deleteUser(userId);

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                null,
                "User deleted successfully"
            )
        );
});

export { createUserCont, getUserCont, updateUserCont, deleteUserCont };
