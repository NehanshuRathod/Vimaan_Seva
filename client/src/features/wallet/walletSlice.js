import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    balance: 0,
    loading: false,
    error: null,
};

const walletSlice = createSlice({
    name: "wallet",
    initialState,
    reducers: {},
});

export default walletSlice.reducer;
