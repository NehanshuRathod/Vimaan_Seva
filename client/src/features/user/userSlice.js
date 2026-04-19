import { createSlice } from "@reduxjs/toolkit";

const loadUserFromStorage = () => {
    try {
        const storedUserId = localStorage.getItem("currentUserId");
        return storedUserId || null;
    } catch (error) {
        console.error("Failed to load user from localStorage:", error);
        return null;
    }
};

const initialState = {
    currentUserId: loadUserFromStorage(),
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUserId: (state, action) => {
            state.currentUserId = action.payload;
            try {
                if (action.payload) {
                    localStorage.setItem("currentUserId", action.payload);
                } else {
                    localStorage.removeItem("currentUserId");
                }
            } catch (error) {
                console.error("Failed to save user to localStorage:", error);
            }
        },
        clearUserId: (state) => {
            state.currentUserId = null;
            try {
                localStorage.removeItem("currentUserId");
            } catch (error) {
                console.error("Failed to clear user from localStorage:", error);
            }
        },
    },
});

export const { setUserId, clearUserId } = userSlice.actions;
export default userSlice.reducer;
