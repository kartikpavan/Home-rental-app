import { Schema, model } from "mongoose";

const BookingSchema = new Schema(
  {
    customerId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    hostId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    listingId: {
      type: Schema.Types.ObjectId,
      ref: "Listing",
    },
    startDate: {
      type: String,
      required: true,
    },
    endDate: {
      type: String,
      required: true,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const Booking = model("Booking", BookingSchema);

export default Booking;
