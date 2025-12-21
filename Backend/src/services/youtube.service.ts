import { YoutubeTranscript } from "youtube-transcript";

export const getYoutubeText = async (videoUrl: string) => {
    try {
        const transcriptConfig =
            await YoutubeTranscript.fetchTranscript(videoUrl);

        const fullText = transcriptConfig.map((part) => part.text).join(" ");

        return fullText.substring(0, 10000);
    } catch (error) {
        console.error("YouTube Transcript Error:", error);
        throw new Error(
            "Could not retrieve transcript. Video might not have captions."
        );
    }
};
