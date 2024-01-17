import { Router } from "express";
import {
   createListingController,
   getAllListingsController,
} from "../controller/listing.controller.js";
import { upload } from "../utils/helper.js";

const router = Router();

router.post("/create-listing", upload.array("images"), createListingController);
router.get("/", getAllListingsController);

export default router;
