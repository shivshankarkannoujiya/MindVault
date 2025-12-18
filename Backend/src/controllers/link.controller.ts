import { Link } from "../models/Link.model.js";
import { Content } from "../models/Content.model.js";
import { User } from "../models/User.model.js";
import type { Request, Response } from "express";
import { random } from "../utils/generateRandomStr.js";

const setShareStatus = async (req: Request, res: Response) => {
    try {
        const { share } = req.body;

        // @ts-ignore
        const userId = req.user?._id;

        if (!userId) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized: User not found",
            });
        }

        if (share) {
            let link = await Link.findOne({ userId });

            if (!link) {
                link = await Link.create({
                    userId,
                    hash: random(10),
                });
            }

            return res.status(200).json({
                success: true,
                message: "Sharing enabled",
                hash: link.hash,
            });
        }

        await Link.deleteOne({ userId });

        return res.status(200).json({
            success: true,
            message: "Sharing disabled. Old link is now invalid.",
        });
    } catch (error) {
        console.error("ERROR GENERATING SHARABLE LINK: ", error);
        return res.status(500).json({
            success: false,
            message:
                error instanceof Error
                    ? error.message
                    : "Unable to update share status",
        });
    }
};

const shareLink = async (req: Request, res: Response) => {
    const hash = req.params.shareLink;

    if (!hash) {
        return res.status(400).json({
            success: false,
            message: "Share hash is required",
        });
    }

    try {
        const link = await Link.findOne({ hash }).lean();

        if (!link) {
            return res.status(404).json({
                success: false,
                message: "Invalid or expired share link",
            });
        }

        const content = await Content.find({ userId: link.userId }).lean();

        const user = await User.findById(link.userId).select("username").lean();

        // NOTE: Edge case: Link exists but user was deleted
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User no longer exists",
            });
        }

        return res.status(200).json({
            success: true,
            username: user.username,
            content,
        });
    } catch (error) {
        console.error(`Error fetching brain for hash ${hash}: `, error);
        return res.status(500).json({
            success: false,
            messafe:
                error instanceof Error
                    ? error.message
                    : "Internal server error",
        });
    }
};

export { setShareStatus, shareLink };
