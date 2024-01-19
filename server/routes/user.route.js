import { Router } from "express";
import {
  getTripsController,
  addToWishListController,
  getHomeListingsController,
} from "../controller/user.controller.js";

const router = Router();

router.get("/:userId/trips", getTripsController);
router.patch("/:userId/:listingId", addToWishListController);
router.get("/:userId/listings", getHomeListingsController);

export default router;
