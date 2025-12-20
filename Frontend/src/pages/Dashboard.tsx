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

    {/* 1. 'min-h-screen bg-gray-100': Full height background
         2. 'p-4': Padding for mobile
         3. 'md:ml-72': On desktop, leave space for sidebar. On mobile, full width.
      */}
    <div className="min-h-screen bg-gray-100 p-4 md:ml-72 transition-all duration-300">
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

      {/* Main Width Container */}
      <div className="max-w-6xl mx-auto mt-6">
        {/* Header: Title + Buttons */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div className="text-2xl font-bold text-gray-800">My Brain</div>

          <div className="flex gap-4 w-full sm:w-auto">
            <Button
              onClick={() => setModalOpen(true)}
              varient="primary"
              text="Add content"
              startIcon={<PlusIcon />}
              className="cursor-pointer min-w-32 md:min-w-40 flex items-center justify-center font-medium flex-1 sm:flex-none"
            />
            <Button
              onClick={shareBrain}
              varient="secondary"
              text={isSharing ? "Generating..." : "Share Brain"}
              startIcon={isSharing ? <LoadingIcon /> : <ShareIcon />}
              className="cursor-pointer min-w-32 md:min-w-40 flex items-center justify-center font-medium flex-1 sm:flex-none"
            />
          </div>
        </div>

        {/* Masonry Grid Layout */}
        {/* columns-1 (mobile) -> columns-3 (desktop) */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
          {contents.map(({ type, link, title }, idx) => (
            // 'break-inside-avoid' prevents cards from being cut in half across columns
            <div key={idx} className="break-inside-avoid mb-6">
              <Card type={type} title={title} link={link} />
            </div>
          ))}
        </div>
      </div>
    </div>
  </>
);
};

export default Dashboard;
