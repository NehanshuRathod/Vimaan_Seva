import { isValidObjectId } from "mongoose";
import { ApiError } from "../../utils/ApiError.js";

const isIdValid = (id) => {
    if (!isValidObjectId(id)) {
        throw new ApiError(400, "ID is not valid.");
    }
};

export { isIdValid };
