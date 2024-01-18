import { Router } from "express";
import {
  createListingController,
  getAllListingsController,
  getListingByIdController,
} from "../controller/listing.controller.js";
import { upload } from "../utils/helper.js";

const router = Router();

router.post("/create-listing", upload.array("images"), createListingController);
router.get("/", getAllListingsController);
router.get("/:id", getListingByIdController);

export default router;
