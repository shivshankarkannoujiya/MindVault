import express from "express";
import type { Application } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

const app: Application = express();

app.use(
    cors({
        origin: "http://localhost:5173",
        credentials: true,
        methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        allowedHeaders: ["Content-Type", "Authorization"],
    })
);
app.use(express.json({ limit: "4mb" }));
app.use(express.urlencoded({ extended: true, limit: "4mb" }));
app.use(cookieParser());

// import router
import userRouter from "./routes/user.route.js";
import contentRouter from "./routes/content.route.js";
import linkRouter from "./routes/link.route.js";
import aiRouter from "./routes/ai.route.js"

app.use("/api/v1/users", userRouter);
app.use("/api/v1/contents", contentRouter);
app.use("/api/v1/brain", linkRouter);
app.use("/api/v1/ai", aiRouter);

export default app;
