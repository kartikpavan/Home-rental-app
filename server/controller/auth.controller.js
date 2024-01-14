import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
   cloud_name: process.env.CLOUDINARY_NAME,
   api_key: process.env.CLOUDINARY_API_KEY,
   api_secret: process.env.CLOUDINARY_SECRET_KEY,
   secure: true,
});

export async function registerController(req, res) {
   try {
      const { firstName, lastName, email, password } = req.body; // req.body will hold the text fields

      // check if the user exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
         return res.status(400).json({ message: "User already exists" });
      }
      // hash the password
      const hashedPassword = await bcrypt.hash(password, 10);
      // create new user inside db
      const newUser = await User.create({
         firstName,
         lastName,
         email,
         password: hashedPassword,
      });

      const profilePic = req.file; // req.file is the `profilePic` file
      if (!profilePic) {
         return res.status(400).json({ message: "No File Uploaded" });
      }
      const imagePath = profilePic.path;
      const { secure_url, public_id } = await cloudinary.uploader.upload(imagePath, {
         gravity: "face",
         height: 200,
         width: 200,
         crop: "thumb",
      });
      newUser.profileImage = {
         url: secure_url,
         public_id: public_id,
      };

      // Save user to the db
      const savedUser = await newUser.save();
      console.log("saved user", savedUser);
      return res.status(201).json({ message: "User created successfully", data: savedUser });
   } catch (error) {
      return res.status(500).json({ message: error.message });
   }
}

export async function loginController(req, res) {
   try {
      const { email, password } = req.body;
      // check if user exist
      const existingUser = await User.findOne({ email });
      if (!existingUser) {
         return res.status(404).json({ message: "User not found" });
      }
      // check if password is matches the hash password stored in DB
      const isMatch = await bcrypt.compare(password, existingUser.password);
      if (!isMatch) {
         return res.status(401).json({ message: "Invalid credentials" });
      }
      // generate JWT token
      const token = jwt.sign({ id: existingUser._id }, process.env.JWT_SECRET);

      return res.status(200).json({ message: "Login successful", token, data: existingUser });
   } catch (error) {
      return res.status(500).json({ message: error.message });
   }
}
