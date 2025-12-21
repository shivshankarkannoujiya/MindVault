import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { summarize } from "../controllers/ai.controller.js";


const router = Router();

router.route("/summarize").post(verifyJWT, summarize)

export default router