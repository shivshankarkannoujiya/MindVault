import { useState } from "react";
import CreateContentModal from "../components/CreateContentModal";
import Button from "../components/Button";
import PlusIcon from "../icons/PlusIcon";
import ShareIcon from "../icons/ShareIcon";
import Card from "../components/Card";
import SideBar from "../components/SideBar";
import { useContent } from "../hooks/useContent";
import axios from "axios";
import { BACKEND_URL, FRONTEND_URL } from "../config";
import ShareLinkModal from "../components/ShareLinkModal";
import LoadingIcon from "../icons/LoadingIcon";

const Dashboard = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [shareUrl, setShareUrl] = useState("");
  const [isSharing, setIsSharing] = useState(false);

  const { contents, refresh } = useContent();

  const shareBrain = async () => {
    try {
      setIsSharing(true);

      const response = await axios.post(
        `${BACKEND_URL}/brain/share`,
        {
          share: true,
        },
        {
          withCredentials: true,
        }
      );

      console.log(`URL: `, response.data?.hash);
      const shareUrl = `${FRONTEND_URL}/share/${response.data.hash}`;

      setShareUrl(shareUrl);
      setShareModalOpen(true);

      await navigator.clipboard.writeText(shareUrl);
    } catch (error) {
      console.error(`Failed to generate share link`, error);
    } finally {
      setIsSharing(false);
    }
  };

  return (
    <>
      <SideBar />
      <div className="p-4 ml-72 min-h-screen bg-gray-100">
        <CreateContentModal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          onSuccess={refresh}
        />

        <ShareLinkModal
          open={shareModalOpen}
          onClose={() => setShareModalOpen(false)}
          shareUrl={shareUrl}
        />

        <div className="flex justify-end gap-4 mb-4 ">
          <Button
            onClick={() => setModalOpen(true)}
            varient="primary"
            text="Add content"
            startIcon={<PlusIcon />}
            className="cursor-pointer min-w-40 flex items-center justify-center font-medium"
          />
          <Button
            onClick={shareBrain}
            varient="secondary"
            text={isSharing ? `Generating...` : `Share Brain`}
            startIcon={isSharing ? <LoadingIcon /> : <ShareIcon />}
            className="cursor-pointer min-w-40 flex items-center justify-center font-medium"
          />
        </div>
        <div className="flex gap-5 flex-wrap">
          {contents.map(({ type, link, title }, idx) => (
            <Card key={idx} type={type} title={title} link={link} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
