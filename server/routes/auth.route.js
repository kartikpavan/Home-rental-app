import { Router } from "express";
import { loginController, registerController } from "../controller/auth.controller.js";
import { upload } from "../utils/helper.js";

const router = Router();

router.post("/register", upload.single("profilePic"), registerController);
router.post("/login", loginController);

export default router;
