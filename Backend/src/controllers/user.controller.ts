import { User } from "../models/User.model.js";
import type { Request, Response } from "express";
import { cookieOptions } from "../utils/constant.js";

const registerUser = async (req: Request, res: Response) => {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(401).json({
                success: false,
                message: "All fields are required",
            });
        }

        const existingUser = await User.findOne({
            $or: [{ username }, { email }],
        });

        if (existingUser) {
            return res.status(409).json({
                success: false,
                message: "User already registered",
            });
        }

        const user = await User.create({
            username,
            email,
            password,
        });

        const createdUser = await User.findById(user._id).select("-password");
        if (!createdUser) {
            return res.status(400).json({
                success: false,
                message: "User not created",
            });
        }

        return res.status(201).json({
            success: true,
            message: "User registered successfully",
            user: createdUser,
        });
    } catch (error) {
        console.error("ERROR REGISTERING USER: ", error);
        return res.status(500).json({
            success: false,
            message:
                error instanceof Error
                    ? error.message
                    : "Internal server error",
        });
    }
};

const loginUser = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(401).json({
                success: false,
                message: "All fields are required",
            });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Invalid credentials",
            });
        }

        const isPasswordMatch = user.isPasswordCorrect(password);
        if (!isPasswordMatch) {
            return res.status(400).json({
                success: false,
                message: "Invalid credentials",
            });
        }

        const token = user.generateToken();

        return res
            .status(200)
            .cookie("accessToken", token, cookieOptions)
            .json({
                success: true,
                message: "User logged in successfully",
                user: {
                    _id: user._id,
                    email: user.email,
                    username: user.username,
                },
                accessToken: token,
            });
    } catch (error) {
        console.error("ERROR LOGIN USER: ", error);
        return res.status(500).json({
            success: false,
            message:
                error instanceof Error
                    ? error.message
                    : "Internal server error",
        });
    }
};

const getMe = async (req: Request, res: Response) => {
    try {
        // @ts-ignore
        const userId = req.user?._id;

        if (!userId) {
            return res.status(403).json({
                success: false,
                message: "You are not loggedIn",
            });
        }
        const user = await User.findById(userId).select("username email");

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not registered",
            });
        }

        return res.status(200).json({
            success: true,
            message: "User fetched successfully",
            user: {
                username: user.username,
                email: user.email,
            },
        });
    } catch (error) {
        console.error("ERROR FETCHING USER: ", error);
        return res.status(500).json({
            success: false,
            message:
                error instanceof Error
                    ? error.message
                    : "Internal server error",
        });
    }
};

export { registerUser, loginUser, getMe };
