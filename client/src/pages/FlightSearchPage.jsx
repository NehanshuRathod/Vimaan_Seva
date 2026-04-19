import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import flightService from "../api/flightApi";
import FlightCard from "../components/FlightCard";
import { toast } from "react-toastify";

const FlightSearchPage = () => {
    const [flights, setFlights] = useState([]);
    const [pagination, setPagination] = useState(null);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const from = searchParams.get("from");
    const to = searchParams.get("to");

    useEffect(() => {
        (async () => {
            await fetchFlights(currentPage);
        })();
    }, [currentPage, from, to]);

    const fetchFlights = async (page) => {
        try {
            setLoading(true);
            let response;

            if (from && to) {
                response = await flightService.searchFlights(from, to);
                setFlights(response.data.flights || []);
                setPagination(null);
            } else {
                response = await flightService.getAllFlights(page, 10);
                setFlights(response.data.flights);
                setPagination({
                    currentPage: response.data.page,
                    totalPages: response.data.totalPages,
                    totalItems: response.data.totalItems,
                    hasNextPage: response.data.hasNextPage,
                    hasPrevPage: response.data.hasPrevPage,
                });
            }
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleShowAll = () => {
        navigate("/flights");
        setCurrentPage(1);
    };

    const handlePrevPage = () => {
        if (pagination?.hasPrevPage) {
            setCurrentPage((prev) => prev - 1);
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    };

    const handleNextPage = () => {
        if (pagination?.hasNextPage) {
            setCurrentPage((prev) => prev + 1);
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="container mx-auto px-6">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800">
                            {from && to
                                ? `Flights from ${from} to ${to}`
                                : "Available Flights"}
                        </h1>
                        {from && to && (
                            <p className="text-gray-600 mt-2">
                                Showing search results
                            </p>
                        )}
                    </div>
                    {from && to && (
                        <button
                            onClick={handleShowAll}
                            className="px-6 py-2 bg-white border-2 border-orange-500 text-orange-500 hover:bg-orange-50 font-semibold rounded-lg transition"
                        >
                            Show All Flights
                        </button>
                    )}
                </div>

                {loading && (
                    <div className="text-center py-12">
                        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-orange-500 border-r-transparent"></div>
                        <p className="mt-4 text-gray-600">Loading flights...</p>
                    </div>
                )}

                {!loading && flights.length === 0 && (
                    <div className="text-center py-12">
                        <p className="text-gray-600 text-lg">
                            No flights available
                        </p>
                    </div>
                )}

                {!loading && flights.length > 0 && (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                            {flights.map((flight) => (
                                <FlightCard key={flight._id} flight={flight} />
                            ))}
                        </div>

                        {pagination && pagination.totalPages > 1 && (
                            <div className="flex justify-center items-center gap-4 mt-8">
                                <button
                                    onClick={handlePrevPage}
                                    disabled={!pagination.hasPrevPage}
                                    className={`px-6 py-2 rounded-lg font-semibold transition ${
                                        pagination.hasPrevPage
                                            ? "bg-orange-500 hover:bg-orange-600 text-white"
                                            : "bg-gray-300 text-gray-500 cursor-not-allowed"
                                    }`}
                                >
                                    Previous
                                </button>

                                <span className="text-gray-700 font-medium">
                                    Page {pagination.currentPage} of{" "}
                                    {pagination.totalPages}
                                </span>

                                <button
                                    onClick={handleNextPage}
                                    disabled={!pagination.hasNextPage}
                                    className={`px-6 py-2 rounded-lg font-semibold transition ${
                                        pagination.hasNextPage
                                            ? "bg-orange-500 hover:bg-orange-600 text-white"
                                            : "bg-gray-300 text-gray-500 cursor-not-allowed"
                                    }`}
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

export default FlightSearchPage;
