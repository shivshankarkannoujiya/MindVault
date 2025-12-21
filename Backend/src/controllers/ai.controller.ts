import { generateSummary } from "../services/ai.service.js";
import type { Request, Response } from "express";
import { getYoutubeText } from "../services/youtube.service.js";

export const summarize = async (req: Request, res: Response) => {
    try {
        const { url } = req.body;
        if (!url) return res.status(400).json({ message: "URL is required" });

        let contentToSummarize = url;

        const isYoutube =
            url.includes("youtube.com") || url.includes("youtu.be");

        if (isYoutube) {
            console.log("Extracting YouTube transcript...");
            contentToSummarize = await getYoutubeText(url);
        }

        const summary = await generateSummary(contentToSummarize);

        return res.json({
            success: true,
            summary,
        });
    } catch (error) {
        console.error("AI Error:", error);
        return res.status(500).json({
            success: false,
            message:
                error instanceof Error
                    ? error.message
                    : "AI failed to process content",
        });
    }
};
