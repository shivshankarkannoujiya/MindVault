import { TwitterTweetEmbed } from "react-twitter-embed";

interface TweetProps {
  tweetUrl: string;
}

const Tweet = ({ tweetUrl }: TweetProps) => {
  const tweetId = tweetUrl.match(/status\/(\d+)/)?.[1];

  if (!tweetId) {
    return <div className="p-4 text-xs text-red-500">Invalid Twitter URL</div>;
  }

  return (
    <div className="twitter-tweet w-full">
      <TwitterTweetEmbed
        tweetId={tweetId}
        options={{
          conversation: "none",
          cards: "visible",
          width: "100%",
        }}
      />
    </div>
  );
};

export default Tweet;
