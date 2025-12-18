import type { CookieOptions } from "express";
import { ENV } from "../config/env.js";

export const DB_NAME: string = "second_brain";

export const cookieOptions: CookieOptions = {
    httpOnly: true,
    secure: ENV.NODE_ENV === "production",
    sameSite: ENV.NODE_ENV === "production" ? "strict" : "lax",
    maxAge: 24 * 60 * 60 * 1000,
};
