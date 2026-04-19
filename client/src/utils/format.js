export const formatPrice = (price) => {
    if (!price && price !== 0) return "₹0";
    return `₹${Number(price).toLocaleString("en-IN")}`;
};

export const formatDate = (date) => {
    if (!date) return "N/A";
    return new Date(date).toLocaleDateString("en-IN", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });
};

export const formatTimeAndDate = (timestamp) => {
    if (!timestamp) return "N/A";
    const date = new Date(timestamp);

    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    return `${day}-${month}-${year} at ${hours}:${minutes}`;
};
