import { Router } from "express";
import { getMe, loginUser, logoutUser, registerUser } from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";


const router = Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/me").get(verifyJWT, getMe);
router.route("/logout").post(verifyJWT, logoutUser);

export default router;
