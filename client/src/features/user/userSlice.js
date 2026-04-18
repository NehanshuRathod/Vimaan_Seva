import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentUserId: null,
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUserId: (state, action) => {
            state.currentUserId = action.payload;
        },
        clearUserId: (state) => {
            state.currentUserId = null;
        },
    },
});

export const { setUserId, clearUserId } = userSlice.actions;
export default userSlice.reducer;
