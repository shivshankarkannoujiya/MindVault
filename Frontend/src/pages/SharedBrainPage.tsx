import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Button from "../components/Button";
import Card from "../components/Card";
import { BACKEND_URL } from "../config";
import axios from "axios";

interface SharedContent {
  username: string;
  content: {
    type: "youtube" | "twitter";
    link: string;
    title: string;
  }[];
}

const capitalizeFirst = (str: string) => {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
};

const SharedBrainPage = () => {
  const { shareLink } = useParams();
  const [data, setData] = useState<SharedContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchSharedContent = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/brain/${shareLink}`);

        if (response.data.success) {
          setData({
            username: response.data.username,
            content: response.data.content,
          });
        }
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    if (shareLink) {
      fetchSharedContent();
    }
  }, [shareLink]);

  if (loading)
    return (
      <div className="h-screen flex items-center justify-center">
        Loading...
      </div>
    );

  if (error || !data) {
    return (
      <div className="h-screen flex flex-col items-center justify-center text-red-500">
        <h1 className="text-3xl font-bold mb-2">404</h1>
        <p className="text-gray-600">
          This brain is either private or doesn't exist.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-5xl mx-auto mt-6">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4 px-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-800">
              {capitalizeFirst(data.username)}'s Brain
            </h1>
            <p className="text-slate-500 mt-1">Shared public collection</p>
          </div>

          <div className="w-full sm:w-auto">
            <Button
              text="Create Your Own Brain"
              varient="primary"
              onClick={() => window.open("/", "_self")}
              className="w-full sm:w-auto cursor-pointer"
            />
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-6 pb-8">
          {data.content.map((item: any, index: number) => (
            <Card
              key={index}
              type={item.type}
              title={item.title}
              link={item.link}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SharedBrainPage;
