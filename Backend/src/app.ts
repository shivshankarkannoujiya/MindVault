import express from "express";
import type { Application } from "express";

const app: Application = express();

app.use(express.json({ limit: "4mb" }));
app.use(express.urlencoded({ extended: true, limit: "4mb" }));

export default app;
