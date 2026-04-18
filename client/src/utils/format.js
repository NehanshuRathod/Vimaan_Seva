export const formatPrice = (price) => {
    return `₹${price.toLocaleString("en-IN")}`;
};

export const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-IN", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });
};
