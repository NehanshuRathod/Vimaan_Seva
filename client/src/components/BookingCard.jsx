import { formatPrice, formatTimeAndDate } from "../utils/format";

const BookingCard = ({ booking }) => {
    return (
        <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6 border border-gray-200">
            <div className="flex justify-between items-start mb-4">
                <div>
                    <h3 className="text-xl font-bold text-gray-800">
                        {booking.flightDetails.airline}
                    </h3>
                    <p className="text-sm text-gray-500">
                        Flight ID: {booking.flightDetails._id}
                    </p>
                </div>
                <div className="text-right">
                    <p className="text-xs text-gray-500">PNR</p>
                    <p className="text-lg font-bold text-orange-600">
                        {booking.PNR}
                    </p>
                </div>
            </div>

            <div className="mb-4">
                <div className="flex items-center gap-2 text-gray-700">
                    <span className="font-semibold">
                        {booking.flightDetails.departureCity}
                    </span>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                        className="w-5 h-5"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3"
                        />
                    </svg>
                    <span className="font-semibold">
                        {booking.flightDetails.arrivalCity}
                    </span>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                <div>
                    <p className="text-gray-500">Passenger</p>
                    <p className="font-semibold text-gray-800">
                        {booking.passengerName}
                    </p>
                </div>
                <div className="text-right">
                    <p className="text-gray-500">Price Paid</p>
                    <p className="font-semibold text-green-600">
                        {formatPrice(booking.amountPaid)}
                    </p>
                </div>
            </div>

            <div className="mb-4 text-sm">
                <p className="text-gray-500">Booking Date & Time</p>
                <p className="font-semibold text-gray-800">
                    {formatTimeAndDate(booking.flightDetails.createdAt)}
                </p>
            </div>

            <button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors">
                Download Ticket
            </button>
        </div>
    );
};

export default BookingCard;
