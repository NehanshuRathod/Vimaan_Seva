import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    data: [],
    loading: false,
    error: null,
};

const bookingsSlice = createSlice({
    name: "bookings",
    initialState,
    reducers: {},
});

export default bookingsSlice.reducer;
