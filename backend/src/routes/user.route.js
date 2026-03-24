import { Router } from "express";
import { registerUser, loginUser, logoutUser, getAllUserStaff, getCurrentUser } from "../controller/user.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";

const router = Router();
router.route("/register-user").post(registerUser);
router.route("/login-user").post(loginUser);
router.route("/logout-user").post(verifyJWT, logoutUser);
router.route("/all-staff").get(verifyJWT, getAllUserStaff);
router.route("/current-user").get(verifyJWT, getCurrentUser);

export default router;