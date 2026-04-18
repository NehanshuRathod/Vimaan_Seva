import { configureStore } from "@reduxjs/toolkit";
import flightsReducer from "../features/flights/flightsSlice";
import bookingsReducer from "../features/bookings/bookingsSlice";
import walletReducer from "../features/wallet/walletSlice";
import userReducer from "../features/user/userSlice";

const store = configureStore({
    reducer: {
        flights: flightsReducer,
        bookings: bookingsReducer,
        wallet: walletReducer,
        user: userReducer,
    },
});

export default store;
