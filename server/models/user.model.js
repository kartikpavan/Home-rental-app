import { Schema, model } from "mongoose";

const UserSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    profileImage: {
      type: String,
      required: true,
      default: "",
    },
    myTrips: {
      type: Array,
      default: [],
    },
    myProperties: {
      type: Array,
      default: [],
    },
    myReservations: {
      type: Array,
      default: [],
    },
    wishList: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

const User = model("User", UserSchema);
export default User;
