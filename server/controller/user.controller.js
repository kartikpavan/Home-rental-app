import Booking from "../models/booking.model.js";

export async function getTrips(req, res) {
  // listing -> name , id , price , images
  // booking ->  startDate, endDate , total price

  try {
    const { userId } = req.params;
    const trips = await Booking.find({ customerId: userId }).populate(
      "hostId listingId customerId"
    );

    console.log(trips);
    const data = trips.map((trip) => {
      return {
        tripId: trip._id,
        listingId: trip.listingId._id,
        images: trip.listingId.images,
        name: trip.listingId.title,
        startDate: trip.startDate,
        endDate: trip.endDate,
        price: trip.totalPrice,
        accomodation: trip.listingId.accomodation,
      };
    });
    return res.status(200).json({ data });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: error.message });
  }
}
