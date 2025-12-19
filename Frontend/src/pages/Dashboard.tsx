import { useState } from "react";
import CreateContentModal from "../components/CreateContentModal";
import Button from "../components/Button";
import PlusIcon from "../icons/PlusIcon";
import ShareIcon from "../icons/ShareIcon";
import Card from "../components/Card";
import SideBar from "../components/SideBar";
import { useContent } from "../hooks/useContent";

const Dashboard = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const { contents, refresh } = useContent();

  return (
    <>
      <SideBar />
      <div className="p-4 ml-72 min-h-screen bg-gray-100">
        <CreateContentModal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          onSuccess={refresh}
        />
        <div className="flex justify-end gap-4 mb-4 ">
          <Button
            onClick={() => setModalOpen(true)}
            varient="primary"
            text="Add content"
            startIcon={<PlusIcon />}
            className="cursor-pointer"
          />
          <Button
            varient="secondary"
            text="Share Brain"
            startIcon={<ShareIcon />}
            className="cursor-pointer"
          />
        </div>
        <div className="flex gap-5 flex-wrap">
          {contents.map(({ type, link, title }) => (
            <Card type={type} title={title} link={link} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
