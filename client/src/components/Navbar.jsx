import { Link } from "react-router-dom";
import UserSelector from "./UserSelector";

const Navbar = () => {
    return (
        <nav className="bg-white shadow-sm border-b border-gray-200">
            <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                <Link to="/" className="text-2xl font-bold text-gray-800">
                    bookMyFlight
                </Link>
                <div className="flex gap-4 items-center">
                    <Link
                        to="/flights"
                        className="px-4 py-2 text-gray-700 hover:text-gray-900 font-medium"
                    >
                        Flights
                    </Link>
                    <Link
                        to="/bookings"
                        className="px-4 py-2 text-gray-700 hover:text-gray-900 font-medium"
                    >
                        Booking History
                    </Link>
                    <Link
                        to="/wallet"
                        className="px-4 py-2 text-gray-700 hover:text-gray-900 font-medium flex items-center gap-2"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-5 h-5"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M21 12a2.25 2.25 0 0 0-2.25-2.25H15a3 3 0 1 1-6 0H5.25A2.25 2.25 0 0 0 3 12m18 0v6a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 9m18 0V6a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 6v3"
                            />
                        </svg>
                        Wallet
                    </Link>
                    <UserSelector />
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
