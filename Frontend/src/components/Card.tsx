import ShareIcon from "../icons/ShareIcon";
import TrashIcon from "../icons/TrashIcon";
import XIcon from "../icons/XIcon";
import Tweet from "./Tweet";
import YoutubeIcon from "../icons/YoutubeIcon";
interface CardProps {
  title: string;
  link: string;
  onDelete: () => void;
  type: "twitter" | "youtube";
}

const getYouTubeId = (link: string) => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = link.match(regExp);
  return match && match[2].length === 11 ? match[2] : null;
};

const Card = ({
  title,
  link,
  type = "twitter",
  onDelete,
}: CardProps) => {
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
          <div className="text-gray-400 cursor-pointer hover:text-purple-600 transition">
            <ShareIcon />
          </div>
          <div
            onClick={() => onDelete()}
            className="text-gray-400 cursor-pointer hover:text-red-500 transition"
          >
            <TrashIcon />
          </div>
        </div>
      </div>

      <div
        className="p-4 h-80 overflow-y-auto [&::-webkit-scrollbar]:hidden"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
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
