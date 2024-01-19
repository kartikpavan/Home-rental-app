import { Router } from "express";
import { getTrips } from "../controller/user.controller.js";

const router = Router();

router.get("/:userId/trips", getTrips);

export default router;
