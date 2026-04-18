import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    searchResults: [],
};

const flightsSlice = createSlice({
    name: "flights",
    initialState,
    reducers: {
        setSearchResults: (state, action) => {
            state.searchResults = action.payload;
        },
        clearSearchResults: (state) => {
            state.searchResults = [];
        },
    },
});

export const { setSearchResults, clearSearchResults } = flightsSlice.actions;
export default flightsSlice.reducer;
