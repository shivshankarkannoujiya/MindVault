import type { Request, Response } from "express";
import { Content } from "../models/Content.model.js";

const createContent = async (req: Request, res: Response) => {
    try {
        const { title, link, type } = req.body;

        // @ts-ignore
        const userId = req.user?._id;

        const content = await Content.create({
            title,
            link,
            type,
            userId,
            tags: [],
        });

        return res.status(201).json({
            success: true,
            message: "Content added successfully",
            content,
        });
    } catch (error) {
        console.error("ERROR ADDING CONTENT: ", error);
        return res.status(500).json({
            success: false,
            message:
                error instanceof Error
                    ? error.message
                    : "internal server error",
        });
    }
};

const getContent = async (req: Request, res: Response) => {
    try {
        // @ts-ignore
        const userId = req.user?._id;

        const contents = await Content.find({
            userId,
        }).populate("userId", "username email ");

        if (!contents || contents.length === 0) {
            return res.status(200).json({
                success: true,
                message: "Not contents found",
                count: contents.length,
                contents: [],
            });
        }

        return res.status(200).json({
            success: true,
            message: "Contents fetched successfully",
            count: contents.length,
            contents,
        });
    } catch (error) {
        console.error("ERROR FETCHING CONTENTS: ", error);
        return res.status(500).json({
            success: false,
            message:
                error instanceof Error
                    ? error.message
                    : "internal server error",
        });
    }
};

const deleteContent = async (req: Request, res: Response) => {
    try {
        const contentId = req.params.contentId;

        // @ts-ignore
        const userId = req.user?._id;

        if (!contentId) {
            return res.status(400).json({
                success: false,
                message: "Content ID is required",
            });
        }

        const deletedContent = await Content.findOneAndDelete({
            _id: contentId,
            userId,
        });

        if (!deletedContent) {
            return res.status(404).json({
                success: false,
                message:
                    "Content not found or you are not authorized to delete it",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Content deleted successfully",
        });
    } catch (error) {
        console.error("ERROR DELETING CONTENT: ", error);
        return res.status(500).json({
            success: false,
            message:
                error instanceof Error
                    ? error.message
                    : "internal server error",
        });
    }
};

export { createContent, getContent, deleteContent };
