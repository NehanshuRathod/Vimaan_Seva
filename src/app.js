import express from "express";
import cors from "cors";

const app = express(); // entry point of our backend

const corsOptions = {
    origin: process.env.CORS_ORIGIN,
    credentials: true,
};

// config to be used accross whole backend
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cors(corsOptions));

// Routers
import flightRouter from "./interfaces/routes/flight.route.js";
import walletRouter from "./interfaces/routes/wallet.route.js";
import userRouter from "./interfaces/routes/user.route.js";
import bookingAttemptRouter from "./interfaces/routes/bookingAttempt.route.js";
import bookingRouter from "./interfaces/routes/booking.route.js";


app.use("/api/v1/flights", flightRouter);
app.use("/api/v1/wallet", walletRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/bookingAttempts", bookingAttemptRouter);
app.use("/api/v1/bookings", bookingRouter);

export { app };