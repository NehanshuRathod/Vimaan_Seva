import { useNavigate } from "react-router-dom";
import { formatPrice } from "../utils/format";

const FlightCard = ({ flight }) => {
    const navigate = useNavigate();

    const handleBookFlight = () => {
        navigate("/booking", { state: { flight } });
    };

    return (
        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200 hover:shadow-lg transition">
            <div className="flex justify-between items-start mb-4">
                <div>
                    <h3 className="text-xl font-bold text-gray-800">
                        {flight.airline}
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">
                        {flight.departureCity} → {flight.arrivalCity}
                    </p>
                </div>
                <div className="text-right">
                    <p className="text-2xl font-bold text-orange-600">
                        {formatPrice(flight.basePrice)}
                    </p>
                    <p className="text-xs text-gray-500">Base Price</p>
                </div>
            </div>

            <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                <div className="text-sm text-gray-600">
                    <span className="font-medium">Departure:</span> {flight.departureCity}
                    <br />
                    <span className="font-medium">Arrival:</span> {flight.arrivalCity}
                </div>
                <button
                    onClick={handleBookFlight}
                    className="px-6 py-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg transition"
                >
                    Book Flight
                </button>
            </div>
        </div>
    );
};

export default FlightCard;
