import { Schema, model } from "mongoose";

const ListingSchema = new Schema(
   {
      author: {
         type: Schema.Types.ObjectId,
         ref: "User",
         required: true,
      },
      categories: {
         type: [String],
         required: true,
      },
      price: {
         type: Number,
         required: true,
      },
      title: {
         type: String,
         required: true,
      },
      highlight: {
         type: String,
         required: true,
      },
      streetAddress: {
         type: String,
         required: true,
      },
      description: {
         type: String,
         required: true,
      },
      apartmentSuite: {
         type: String,
         required: true,
      },
      city: {
         type: String,
         required: true,
      },
      country: {
         type: String,
         required: true,
      },
      pinCode: {
         type: String,
         required: true,
      },
      facilities: {
         type: [String],
         required: true,
      },
      guests: {
         type: String,
         required: true,
      },
      bedrooms: {
         type: String,
         required: true,
      },
      beds: {
         type: String,
         required: true,
      },
      bathrooms: {
         type: String,
         required: true,
      },
      images: [
         {
            url: {
               type: String,
               required: true,
            },
            public_id: {
               type: String,
               required: true,
            },
         },
      ],
   },
   { timestamps: true }
);

const Listing = model("Listing", ListingSchema);
export default Listing;
