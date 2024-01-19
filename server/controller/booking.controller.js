import Booking from "../models/booking.model.js";

export async function createBookingController(req, res) {
  try {
    const { customerId, hostId, listingId, startDate, endDate, totalPrice } = req.body;
    const newBooking = await Booking.create({
      customerId,
      hostId,
      listingId,
      startDate,
      endDate,
      totalPrice,
    });
    await newBooking.save();
    return res.status(201).json({ message: "Booking created successfully", data: newBooking });
  } catch (error) {
    console.log(" Failed to Book Listing : " + error.message);
    return res.status(500).json({ message: " Failed to Book Listing : " + error.message });
  }
}
