import type { Request, Response, NextFunction } from "express";
import { User } from "../models/User.model.js";
import { ENV } from "../config/env.js";
import jwt, { type JwtPayload } from "jsonwebtoken";

export const verifyJWT = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const token =
            req.cookies?.accessToken ||
            req.header("Authorization")?.replace("Bearer ", "");

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized request: No token provided",
            });
        }

        const decoded = jwt.verify(token, ENV.JWT_SECRET) as JwtPayload;

        const user = await User.findById(decoded?._id).select("-password");

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized request: User not found",
            });
        }

        // @ts-ignore
        req.user = user;
        next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Invalid or Expired Access Token",
        });
    }
};
