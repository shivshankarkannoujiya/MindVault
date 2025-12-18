import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
    createContent,
    deleteContent,
    getContent,
} from "../controllers/Content.controller.js";

const router = Router();

router.use(verifyJWT);

router.route("/create").post(createContent);
router.route("/").get(getContent);
router.route("/").delete(deleteContent);

export default router;
