import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { indianCities } from "../utils/constants";

const HomePage = () => {
    const [departureCity, setDepartureCity] = useState("");
    const [arrivalCity, setArrivalCity] = useState("");
    const navigate = useNavigate();

    const handleSearch = () => {
        if (!departureCity || !arrivalCity) {
            alert("Please select both departure and arrival cities");
            return;
        }
        if (departureCity === arrivalCity) {
            alert("Departure and arrival cities cannot be the same");
            return;
        }
        navigate(`/flights?from=${departureCity}&to=${arrivalCity}`);
    };

    return (
        <div className="min-h-[calc(100vh-73px)] bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-6">
            <div className="w-full max-w-2xl">
                <div className="bg-white rounded-2xl shadow-xl p-8">
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">
                        Search flights
                    </h1>
                    <p className="text-gray-600 mb-8">
                        Enjoy hassle free flight ticket bookings at lowest
                        airfare
                    </p>

                    <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Departure City
                                </label>
                                <select
                                    value={departureCity}
                                    onChange={(e) =>
                                        setDepartureCity(e.target.value)
                                    }
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                >
                                    <option value="">Select city</option>
                                    {indianCities.map((city) => (
                                        <option key={city} value={city}>
                                            {city}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Arrival City
                                </label>
                                <select
                                    value={arrivalCity}
                                    onChange={(e) =>
                                        setArrivalCity(e.target.value)
                                    }
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                >
                                    <option value="">Select city</option>
                                    {indianCities.map((city) => (
                                        <option key={city} value={city}>
                                            {city}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <button
                            onClick={handleSearch}
                            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-6 rounded-lg transition duration-200"
                        >
                            Search Flights
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomePage;
