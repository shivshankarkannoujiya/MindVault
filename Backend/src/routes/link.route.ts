import { Router } from "express";
import { setShareStatus, shareLink } from "../controllers/link.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/share").post(verifyJWT, setShareStatus);
router.route("/:shareLink").get(verifyJWT, shareLink);

export default router;
