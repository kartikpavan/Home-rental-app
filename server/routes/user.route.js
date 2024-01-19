import { Router } from "express";
import { getTripsController, addToWishListController } from "../controller/user.controller.js";

const router = Router();

router.get("/:userId/trips", getTripsController);
router.patch("/:userId/:listingId", addToWishListController);

export default router;
