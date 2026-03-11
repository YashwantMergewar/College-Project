import { Router } from "express";
import { registerUser, loginUser, logoutUser } from "../controller/user.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";

const router = Router();
router.route("/register-user").post(registerUser)
router.route("/login-user").post(loginUser)
router.route("/logout-user").post(verifyJWT, logoutUser)

export default router;