import express from "express";
import type { Application } from "express";
import cookieParser from "cookie-parser";

const app: Application = express();

app.use(express.json({ limit: "4mb" }));
app.use(express.urlencoded({ extended: true, limit: "4mb" }));
app.use(cookieParser())

// import router
import userRouter from "./routes/user.route.js";
import contentRouter from "./routes/content.route.js";
import linkRouter from "./routes/link.route.js";

app.use("/api/v1/users", userRouter)
app.use("/api/v1/contents", contentRouter)
app.use("/api/v1/brain", linkRouter)


export default app;
