import { jsPDF } from "jspdf";

export const downloadTicketPDF = (booking) => {
    const doc = new jsPDF();

    const pnr = String(booking.PNR || "N/A");
    const passengerName = String(booking.passengerName || "N/A");
    const airline = String(booking.flightDetails?.airline || "N/A");
    const flightId = String(
        booking.flightDetails?._id || booking.flightDetails?.flightId || "N/A"
    );
    const departureCity = String(booking.flightDetails?.departureCity || "N/A");
    const arrivalCity = String(booking.flightDetails?.arrivalCity || "N/A");
    const amountPaid = booking.amountPaid
        ? `₹${Number(booking.amountPaid).toLocaleString("en-IN")}`
        : "N/A";
    const bookingDate = booking.createdAt
        ? new Date(booking.createdAt).toLocaleString("en-IN", {
              dateStyle: "medium",
              timeStyle: "short",
          })
        : "N/A";

    doc.setFillColor(249, 115, 22);
    doc.rect(0, 0, 210, 45, "F");

    doc.setTextColor(255, 255, 255);
    doc.setFontSize(10);
    doc.text("E-Ticket", 20, 15);

    doc.setFontSize(28);
    doc.setFont("helvetica", "bold");
    doc.text("Flight Ticket", 20, 32);

    doc.setFontSize(10);
    doc.text("PNR", 160, 15);
    doc.setFontSize(18);
    doc.text(pnr, 160, 30);

    doc.setTextColor(0, 0, 0);
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");

    let y = 60;

    doc.setFillColor(255, 237, 213);
    doc.rect(15, y - 5, 180, 25, "F");
    doc.setFont("helvetica", "bold");
    doc.text("Passenger Details", 20, y + 5);
    doc.setFont("helvetica", "normal");
    doc.text(`Name: ${passengerName}`, 20, y + 15);

    y += 35;

    doc.setFillColor(240, 240, 240);
    doc.rect(15, y - 5, 180, 35, "F");
    doc.setFont("helvetica", "bold");
    doc.text("Flight Details", 20, y + 5);
    doc.setFont("helvetica", "normal");
    doc.text(`Airline: ${airline}`, 20, y + 15);
    doc.text(`Flight ID: ${flightId}`, 20, y + 25);

    y += 45;

    doc.setFillColor(255, 237, 213);
    doc.rect(15, y - 5, 180, 25, "F");
    doc.setFont("helvetica", "bold");
    doc.text("Route", 20, y + 5);
    doc.setFont("helvetica", "normal");
    doc.text(`${departureCity}  →  ${arrivalCity}`, 20, y + 15);

    y += 35;

    doc.setFillColor(240, 240, 240);
    doc.rect(15, y - 5, 180, 25, "F");
    doc.setFont("helvetica", "bold");
    doc.text("Payment Details", 20, y + 5);
    doc.setFont("helvetica", "normal");
    doc.text(`Amount Paid: ${amountPaid}`, 20, y + 15);

    y += 35;

    doc.setFillColor(255, 237, 213);
    doc.rect(15, y - 5, 180, 25, "F");
    doc.setFont("helvetica", "bold");
    doc.text("Booking Information", 20, y + 5);
    doc.setFont("helvetica", "normal");
    doc.text(`Date & Time: ${bookingDate}`, 20, y + 15);

    doc.setFontSize(10);
    doc.setTextColor(128, 128, 128);
    doc.text("Thank you for booking with us!", 105, 280, { align: "center" });
    doc.text(
        "This is a computer-generated ticket and does not require a signature.",
        105,
        287,
        { align: "center" }
    );

    doc.save(`Flight-Ticket-${pnr}.pdf`);
};

export default { downloadTicketPDF };
