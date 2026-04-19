import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import bookingService from "../api/bookingApi";
import BookingCard from "../components/BookingCard";
import { toast } from "react-toastify";

const BookingHistoryPage = () => {
    const { currentUserId } = useSelector((state) => state.user);
    const [bookings, setBookings] = useState([]);
    const [pagination, setPagination] = useState({});
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);

    const fetchBookings = async (page = 1) => {
        if (!currentUserId) {
            toast.error("Please select a user first");
            return;
        }

        try {
            setLoading(true);
            const response = await bookingService.getUserBookingHistory(
                currentUserId,
                page,
                5
            );
            setBookings(response.data.bookings);
            setPagination(response.data.pagination);
            setCurrentPage(page);
            window.scrollTo({ top: 0, behavior: "smooth" });
        } catch (error) {
            toast.error(error.message || "Failed to fetch bookings");
            setBookings([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBookings(1);
    }, [currentUserId]);

    const handlePrevPage = () => {
        if (pagination?.hasPrevPage) {
            fetchBookings(currentPage - 1);
        }
    };

    const handleNextPage = () => {
        if (pagination?.hasNextPage) {
            fetchBookings(currentPage + 1);
        }
    };

    if (!currentUserId) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-8">
                <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full text-center">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-16 h-16 mx-auto text-gray-400 mb-4"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                        />
                    </svg>
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">
                        No User Selected
                    </h2>
                    <p className="text-gray-600 mb-4">
                        Please select a user from the navbar to view booking
                        history
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl font-bold text-gray-800 mb-8">
                    Booking History
                </h1>

                {loading ? (
                    <div className="flex justify-center items-center py-20">
                        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-orange-500"></div>
                    </div>
                ) : bookings.length === 0 ? (
                    <div className="bg-white rounded-lg shadow-xl p-12 text-center">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-20 h-20 mx-auto text-gray-400 mb-4"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z"
                            />
                        </svg>
                        <h2 className="text-2xl font-bold text-gray-800 mb-2">
                            No Bookings Found
                        </h2>
                        <p className="text-gray-600">
                            You haven't made any bookings yet
                        </p>
                    </div>
                ) : (
                    <>
                        <div className="grid gap-6 mb-8">
                            {bookings.map((booking) => (
                                <BookingCard
                                    key={booking._id}
                                    booking={booking}
                                />
                            ))}
                        </div>

                        {pagination?.totalPages > 1 && (
                            <div className="flex justify-center items-center gap-4">
                                <button
                                    onClick={handlePrevPage}
                                    disabled={!pagination?.hasPrevPage}
                                    className="px-6 py-3 bg-white text-gray-700 font-semibold rounded-lg shadow-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                >
                                    Previous
                                </button>
                                <span className="text-gray-700 font-medium">
                                    Page {pagination?.page || 1} of{" "}
                                    {pagination?.totalPages || 1}
                                </span>
                                <button
                                    onClick={handleNextPage}
                                    disabled={!pagination?.hasNextPage}
                                    className="px-6 py-3 bg-orange-500 text-white font-semibold rounded-lg shadow-md hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                >
                                    Next
                                </button>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default BookingHistoryPage;
