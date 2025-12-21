import ShareIcon from "../icons/ShareIcon";
import TrashIcon from "../icons/TrashIcon";
import XIcon from "../icons/XIcon";
import Tweet from "./Tweet";
import YoutubeIcon from "../icons/YoutubeIcon";
import toast from "react-hot-toast";
import axios from "axios";
import { BACKEND_URL } from "../config";
import SparkaleIcon from "../icons/SparkaleIcon";
import { useState } from "react";

interface CardProps {
  title: string;
  link: string;
  onDelete?: () => void;
  type: "twitter" | "youtube";
}

const getYouTubeId = (link: string) => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = link.match(regExp);
  return match && match[2].length === 11 ? match[2] : null;
};

const Card = ({ title, link, type = "twitter", onDelete }: CardProps) => {
  const [summary, setSummary] = useState<String | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleAISummarize = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post(
        `${BACKEND_URL}/ai/summarize`,
        {
          url: link,
        },
        { withCredentials: true }
      );
      setSummary(response.data.summary);
      toast.success("AI Summary generated!");
    } catch (error) {
      toast.error("AI was unable to read this link.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleShareSingleCardLink = async () => {
    try {
      navigator.clipboard.writeText(link);
      toast.success(`Link copied to clipboard!`);
    } catch (error) {
      toast.error(`Failed to copy link`);
    }
  };

  return (
    <div className="bg-white rounded-md shadow-md border border-slate-200 w-72 overflow-hidden flex flex-col hover:shadow-lg transition-shadow duration-200">
      <div className="flex justify-between items-center p-4 bg-white border-b border-slate-100 z-10">
        <div className="flex items-center text-sm font-medium text-slate-700 truncate">
          <div className="pr-2 text-gray-400">
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-black hover:text-gray-700 transition-colors"
            >
              {type === "twitter" ? <XIcon /> : <YoutubeIcon />}
            </a>
          </div>
          <span className="truncate">{title}</span>
        </div>
        <div className="flex gap-2">
          <div
            // onClick={handleAISummarize}
            className={`cursor-pointer transition ${
              isLoading
                ? "animate-pulse text-purple-400"
                : "text-gray-400 hover:text-purple-600"
            }`}
            title="Summarize with AI"
          >
            <SparkaleIcon />
          </div>

          <div
            onClick={handleShareSingleCardLink}
            className="text-gray-400 cursor-pointer hover:text-purple-600 transition"
          >
            <ShareIcon />
          </div>
          {onDelete && (
            <div
              onClick={() => onDelete()}
              className="text-gray-400 cursor-pointer hover:text-red-500 transition"
              title="Delete content"
            >
              <TrashIcon />
            </div>
          )}
        </div>
      </div>

      <div
        className="p-4 h-80 overflow-y-auto [&::-webkit-scrollbar]:hidden"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {summary && (
          <div className="mb-4 p-3 bg-purple-50 rounded-lg border border-purple-100 text-xs text-slate-700 animate-in fade-in slide-in-from-top-1">
            <p className="font-bold text-purple-800 mb-1">AI INSIGHT:</p>
            {summary}
          </div>
        )}

        {type === "youtube" && (
          <iframe
            className="w-full aspect-video rounded-lg"
            src={`https://www.youtube.com/embed/${getYouTubeId(link)}`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        )}

        {type === "twitter" && (
          <div className="w-full">
            <Tweet tweetUrl={link} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Card;
