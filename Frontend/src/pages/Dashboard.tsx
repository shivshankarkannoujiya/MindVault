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
import ConfirmationModal from "../components/ConfirmationModal";

const Dashboard = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [shareUrl, setShareUrl] = useState("");
  const [isSharing, setIsSharing] = useState(false);

  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [disableShareLoading, setDisableShareLoading] = useState(false);

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

  const handleStopSharingClick = () => {
    setShareModalOpen(false);
    setShowConfirmModal(true);
  };

  const confirmDisableSharingBrain = async () => {
    setDisableShareLoading(true);
    try {
      await axios.post(
        `${BACKEND_URL}/brain/share`,
        {
          share: false,
        },
        { withCredentials: true }
      );
      setShareUrl("");
      setShowConfirmModal(false);
      console.log("Brain is now private.");
    } catch (error) {
      console.error(`ERROR DISABLING SHAREURL: `, error);
    } finally {
      setDisableShareLoading(false);
    }
  };

  return (
    <>
      <SideBar />
      <div className="min-h-screen bg-gray-100 p-4 md:ml-72 transition-all duration-300">
        <CreateContentModal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          onSuccess={refresh}
        />

        <ShareLinkModal
          open={shareModalOpen}
          onClose={() => setShareModalOpen(false)}
          onDisableShare={handleStopSharingClick}
          shareUrl={shareUrl}
        />

        <ConfirmationModal
          open={showConfirmModal}
          onClose={() => setShowConfirmModal(false)}
          onConfirm={confirmDisableSharingBrain}
          loading={disableShareLoading}
          title={`Stop Sharing Brain`}
          message={`This will make your shared link invalid. No one will be able to access your public page anymore`}
        />

        <div className="max-w-5xl mx-auto mt-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
            <div className="text-2xl font-bold text-gray-800">My Brain</div>

            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
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
          <div className="flex flex-wrap justify-center gap-6 pb-8">
            {contents.map(({ type, link, title }, idx) => (
              <Card key={idx} type={type} title={title} link={link} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
