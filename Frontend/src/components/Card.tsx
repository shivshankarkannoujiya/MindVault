import ShareIcon from "../icons/ShareIcon";
import TrashIcon from "../icons/TrashIcon";

import Tweet from "./Tweet";

interface CardProps {
  title: string;
  link: string;
  type: "twitter" | "youtube";
}

const getYouTubeId = (link: string) => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = link.match(regExp);
  return match && match[2].length === 11 ? match[2] : null;
};

const Card = ({ title, link, type = "twitter" }: CardProps) => {
  return (
    <div>
      <div className="bg-white rounded-md shadow-md border border-slate-200 max-w-72 overflow-hidden flex flex-col">
        <div className="flex justify-between items-center p-4 bg-white border-b border-slate-100 z-10">
          <div className="flex items-center text-sm">
            <div className="pr-2 text-gray-500">
              <a href={link} target="_blank">
                <ShareIcon />
              </a>
            </div>
            {title}
          </div>
          <div className="flex">
            <div className="pr-2 text-gray-500">
              <ShareIcon />
            </div>

            <div className="text-gray-500">
              <TrashIcon />
            </div>
          </div>
        </div>

        <div
          className="pt-4 h-80 overflow-y-auto [&::-webkit-scrollbar]:hidden"
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

          {type === "twitter" && <Tweet tweetUrl={link} />}
        </div>
      </div>
    </div>
  );
};

export default Card;
