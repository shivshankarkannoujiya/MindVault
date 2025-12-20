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
import toast from "react-hot-toast";
import SearchBar from "../components/SearchBar";

const Dashboard = () => {
  const { contents, refresh } = useContent();

  const [modalOpen, setModalOpen] = useState(false);

  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [shareUrl, setShareUrl] = useState("");
  const [isSharing, setIsSharing] = useState(false);

  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [disableShareLoading, setDisableShareLoading] = useState(false);

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [contentToDelete, setContentToDelete] = useState<string | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const [filter, setFilter] = useState("");

  const filteredContents = contents.filter((content) =>
    content.title.toLowerCase().includes(filter.toLowerCase())
  );

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

      const shareUrl = `${FRONTEND_URL}/share/${response.data.hash}`;

      setShareUrl(shareUrl);
      setShareModalOpen(true);

      await navigator.clipboard.writeText(shareUrl);
    } catch (error) {
      toast.error(`Failed to generate share link`);
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
      toast.success("Brain is now private");
    } catch (error) {
      toast.error("Failed to update privacy");
    } finally {
      setDisableShareLoading(false);
    }
  };

  const openDeleteModal = (contentId: string) => {
    setContentToDelete(contentId);
    setDeleteModalOpen(true);
  };

  const handleDelete = async () => {
    if (!contentToDelete) return;

    setDeleteLoading(true);

    try {
      await axios.delete(`${BACKEND_URL}/contents/${contentToDelete}`, {
        withCredentials: true,
      });
      await refresh();
      setDeleteModalOpen(false);
      setContentToDelete(null);
      toast.success("Content deleted successfully");
    } catch (error) {
      toast.error("Failed to delete content");
    } finally {
      setDeleteLoading(false);
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

        <ConfirmationModal
          open={deleteModalOpen}
          onClose={() => setDeleteModalOpen(false)}
          onConfirm={handleDelete}
          loading={deleteLoading}
          title={`Delete Content`}
          message={`Are you sure you want to delete this content?`}
          confirmText="Delete"
        />

        <div className="max-w-5xl mx-auto mt-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
            <div className="text-2xl font-bold text-gray-800">My Brain</div>

            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <SearchBar
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
              />

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

          {filteredContents.length === 0 && filter && (
            <div className="flex flex-col items-center justify-center mt-20 text-gray-500">
              <p className="text-lg">No content found matching "{filter}"</p>
            </div>
          )}

          <div className="flex flex-wrap justify-center gap-6 pb-8">
            {filteredContents.map(({ type, link, title, _id }) => (
              <Card
                key={_id}
                type={type}
                title={title}
                link={link}
                onDelete={() => openDeleteModal(_id)}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
