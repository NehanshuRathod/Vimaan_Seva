import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    data: [],
    loading: false,
    error: null,
};

const flightsSlice = createSlice({
    name: "flights",
    initialState,
    reducers: {},
});

export default flightsSlice.reducer;
