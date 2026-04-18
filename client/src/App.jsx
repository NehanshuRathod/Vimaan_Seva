import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import FlightSearchPage from "./pages/FlightSearchPage";
import BookingPage from "./pages/BookingPage";
import BookingHistoryPage from "./pages/BookingHistoryPage";
import WalletPage from "./pages/WalletPage";

function App() {
    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/flights" element={<FlightSearchPage />} />
                <Route path="/booking" element={<BookingPage />} />
                <Route path="/bookings" element={<BookingHistoryPage />} />
                <Route path="/wallet" element={<WalletPage />} />
            </Routes>
        </div>
    );
}

export default App;
