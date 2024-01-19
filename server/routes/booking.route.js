import { Router } from "express";
import { createBookingController } from "../controller/booking.controller.js";

const router = Router();

router.post("/create-booking", createBookingController);

export default router;
