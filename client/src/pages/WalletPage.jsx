import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import walletService from "../api/walletApi";
import { formatPrice } from "../utils/format";
import { toast } from "react-toastify";

const WalletPage = () => {
    const { currentUserId } = useSelector((state) => state.user);
    const [balance, setBalance] = useState(0);
    const [loading, setLoading] = useState(false);
    const [showAddMoney, setShowAddMoney] = useState(false);
    const [amount, setAmount] = useState("");

    useEffect(() => {
        if (currentUserId) {
            fetchBalance();
        }
    }, [currentUserId]);

    const fetchBalance = async () => {
        try {
            setLoading(true);
            const response = await walletService.getWalletBalance(
                currentUserId
            );
            setBalance(response.data.balance);
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleAddMoney = async () => {
        const amountNum = parseFloat(amount);

        if (!amount || amountNum <= 0) {
            toast.error("Please enter a valid amount");
            return;
        }

        try {
            setLoading(true);
            await walletService.addFunds(currentUserId, amountNum);
            toast.success(`${formatPrice(amountNum)} added successfully!`);
            setAmount("");
            setShowAddMoney(false);
            await fetchBalance();
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    if (!currentUserId) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <p className="text-gray-600 text-lg">
                    Please select a user first
                </p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-6">
            <div className="container mx-auto max-w-2xl">
                <h1 className="text-3xl font-bold text-gray-800 mb-8">
                    My Wallet
                </h1>

                {loading && !showAddMoney ? (
                    <div className="text-center py-12">
                        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-orange-500 border-r-transparent"></div>
                        <p className="mt-4 text-gray-600">Loading wallet...</p>
                    </div>
                ) : (
                    <div className="bg-white rounded-2xl shadow-xl p-8">
                        <div className="text-center mb-6">
                            <p className="text-gray-600 text-sm mb-2">
                                Current Balance
                            </p>
                            <p className="text-5xl font-bold text-gray-800">
                                {formatPrice(balance)}
                            </p>
                        </div>

                        {!showAddMoney ? (
                            <button
                                onClick={() => setShowAddMoney(true)}
                                className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-6 rounded-lg transition duration-200"
                            >
                                Add Money
                            </button>
                        ) : (
                            <div className="space-y-4 mt-6 pt-6 border-t border-gray-200">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Enter Amount
                                    </label>
                                    <input
                                        type="number"
                                        value={amount}
                                        onChange={(e) =>
                                            setAmount(e.target.value)
                                        }
                                        placeholder="Enter amount in ₹"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                    />
                                </div>

                                <div className="flex gap-3">
                                    <button
                                        onClick={handleAddMoney}
                                        disabled={loading}
                                        className="flex-1 bg-orange-500 hover:bg-orange-600 disabled:bg-gray-400 text-white font-semibold py-3 px-6 rounded-lg transition duration-200"
                                    >
                                        {loading ? "Adding..." : "Add"}
                                    </button>
                                    <button
                                        onClick={() => {
                                            setShowAddMoney(false);
                                            setAmount("");
                                        }}
                                        disabled={loading}
                                        className="flex-1 bg-gray-300 hover:bg-gray-400 disabled:bg-gray-200 text-gray-700 font-semibold py-3 px-6 rounded-lg transition duration-200"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default WalletPage;
