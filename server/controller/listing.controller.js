import Listing from "../models/listing.model.js";

import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
   cloud_name: process.env.CLOUDINARY_NAME,
   api_key: process.env.CLOUDINARY_API_KEY,
   api_secret: process.env.CLOUDINARY_SECRET_KEY,
   secure: true,
});
export async function createListingController(req, res) {
   try {
      const {
         author,
         categories,
         price,
         title,
         highlight,
         streetAddress,
         description,
         apartmentSuite,
         city,
         country,
         pinCode,
         facilities,
         guests,
         bedrooms,
         beds,
         bathrooms,
      } = req.body;

      // Create new listing instance
      const newListing = await Listing.create({
         author,
         categories,
         price,
         title,
         highlight,
         streetAddress,
         description,
         apartmentSuite,
         city,
         country,
         pinCode,
         facilities,
         guests,
         bedrooms,
         beds,
         bathrooms,
      });

      // Upload the images to cloudinary
      const images = req.files; // req.files will hold the images
      if (!images || images.length === 0) {
         return res.status(400).json({ message: "No Files Uploaded" });
      }
      const uploadedImages = [];
      for (let image of images) {
         const { secure_url, public_id } = await cloudinary.uploader.upload(image.path, {
            height: 100,
            width: 100,
            quality: "auto:low", // Specify the desired compression level
         });
         uploadedImages.push({
            url: secure_url,
            public_id: public_id,
         });
      }
      newListing.images = uploadedImages;
      const savedListing = await newListing.save();
      return res.status(201).json({ message: "Listing created", data: savedListing });
   } catch (error) {
      console.log(" Failed to create Listing : " + error.message);
      return res.status(500).json({ message: " Failed to create Listing" + error.message });
   }
}

export async function getAllListingsController(req, res) {
   const qCategory = req.query.category;
   try {
      let listings;
      if (qCategory) {
         listings = await Listing.find({ categories: { $in: [qCategory] } }).populate("author");
      } else {
         listings = await Listing.find().populate("author");
      }
      return res.status(200).json({ data: listings });
   } catch (error) {
      res.status(404).json({ message: "Failed to fetch listings " + error.message });
   }
}