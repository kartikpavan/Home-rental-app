import Booking from "../models/booking.model.js";
import Listing from "../models/listing.model.js";
import User from "../models/user.model.js";

// Get all my Trips
export async function getTripsController(req, res) {
  try {
    const { userId } = req.params;
    const trips = await Booking.find({ customerId: userId }).populate(
      "hostId listingId customerId"
    );
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

// Get my Home Listings
export async function getHomeListingsController(req, res) {
  try {
    const { userId } = req.params;
    const listings = await Listing.find({ author: userId }).populate("author");
    return res.status(200).json({ data: listings });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: error.message });
  }
}

// Add to wishlist
export async function addToWishListController(req, res) {
  try {
    const { userId, listingId } = req.params;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const listing = await Listing.findById(listingId);
    if (!listing) {
      return res.status(404).json({ message: "Listing not found" });
    }

    const favoriteListing = await user.wishList.find((item) => item._id.toString() === listingId);
    if (favoriteListing) {
      user.wishList = user.wishList.filter((item) => item._id.toString() !== listingId);
      await user.save();
      return res
        .status(200)
        .json({ message: "Listing removed from wishlist", data: user.wishList });
    } else {
      user.wishList.push(listing);
      await user.save();
      return res.status(200).json({ message: "Listing added to wishlist", data: user.wishList });
    }
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: error.message });
  }
}
