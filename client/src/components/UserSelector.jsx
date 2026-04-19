import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUserId } from "../features/user/userSlice";
import { toast } from "react-toastify";
import useSelectUser from "../hooks/useSelectUser";

const UserSelector = () => {
    const dispatch = useDispatch();
    const { currentUserId } = useSelector((state) => state.user);
    const [showDropdown, setShowDropdown] = useState(false);
    const [showInput, setShowInput] = useState(false);
    const [inputValue, setInputValue] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const { selectUser } = useSelectUser();

    const handleSetUser = async (userId) => {
        setIsLoading(true);
        const success = await selectUser(userId);
        setIsLoading(false);

        if (success) {
            setShowDropdown(false);
            setShowInput(false);
            setInputValue("");
        }
    };

    const handleInputSubmit = (e) => {
        e.preventDefault();
        handleSetUser(inputValue);
    };

    return (
        <div className="relative">
            <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg text-sm font-medium text-gray-700 flex items-center gap-2"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                    />
                </svg>
                {currentUserId
                    ? `User: ${currentUserId.slice(0, 8)}...`
                    : "Select User"}
            </button>

            {showDropdown && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50">
                    {!showInput ? (
                        <button
                            onClick={() => setShowInput(true)}
                            className="w-full text-left px-4 py-2 hover:bg-gray-100 text-gray-700"
                        >
                            Enter User ID
                        </button>
                    ) : (
                        <form
                            onSubmit={handleInputSubmit}
                            className="px-4 py-3"
                        >
                            <label className="block text-xs font-medium text-gray-700 mb-2">
                                User ID
                            </label>
                            <input
                                type="text"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                placeholder="Enter User ID"
                                autoFocus
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-orange-500 focus:border-transparent mb-3"
                            />
                            <div className="flex gap-2">
                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="flex-1 bg-orange-500 hover:bg-orange-600 disabled:bg-orange-300 text-white font-semibold py-2 px-4 rounded-lg text-sm"
                                >
                                    {isLoading ? "Loading..." : "Set User"}
                                </button>
                                <button
                                    type="button"
                                    onClick={() => {
                                        setShowInput(false);
                                        setInputValue("");
                                    }}
                                    className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-700 font-semibold py-2 px-4 rounded-lg text-sm"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    )}
                    {currentUserId && (
                        <>
                            <div className="border-t border-gray-200 my-2"></div>
                            <div className="px-4 py-2 text-xs text-gray-500 break-all">
                                Current: {currentUserId}
                            </div>
                            <button
                                onClick={() => {
                                    dispatch(setUserId(null));
                                    setShowDropdown(false);
                                    setShowInput(false);
                                    toast.info("User cleared");
                                }}
                                className="w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600"
                            >
                                Clear User
                            </button>
                        </>
                    )}
                </div>
            )}
        </div>
    );
};

export default UserSelector;
