import { configureStore } from "@reduxjs/toolkit";
import flightsReducer from "../features/flights/flightsSlice";
import userReducer from "../features/user/userSlice";

const store = configureStore({
    reducer: {
        flights: flightsReducer,
        user: userReducer,
    },
});

export default store;
