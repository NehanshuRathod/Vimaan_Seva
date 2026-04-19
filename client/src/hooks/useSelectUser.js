import { useDispatch } from "react-redux";
import { setUserId } from "../features/user/userSlice";
import walletService from "../api/walletApi";
import { toast } from "react-toastify";

const useSelectUser = () => {
    const dispatch = useDispatch();

    const selectUser = async (userId) => {
        if (!userId || userId.trim() === "") {
            toast.error("Please enter a valid User ID");
            return false;
        }

        const trimmedUserId = userId.trim();

        try {
            const { created } = await walletService.ensureWalletExists(
                trimmedUserId
            );

            dispatch(setUserId(trimmedUserId));

            if (created) {
                toast.success("User selected and wallet created!");
            } else {
                toast.success("User selected successfully!");
            }

            return true;
        } catch (error) {
            console.error("Error selecting user:", error);
            toast.error(
                error.response?.data?.message || "Failed to select user"
            );
            return false;
        }
    };

    return { selectUser };
};

export default useSelectUser;
