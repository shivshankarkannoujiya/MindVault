import { useState } from "react";
import Button from "./components/Button";
import Card from "./components/Card";
import CreateContentModal from "./components/CreateContentModal";
import PlusIcon from "./icons/PlusIcon";
import ShareIcon from "./icons/ShareIcon";

const App = () => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="p-4">
      <CreateContentModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
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
      <div className="flex gap-5">
        <Card
          type="twitter"
          title="First twwet"
          link="https://x.com/deedydas/status/2001850593653244011"
        />
        <Card
          type="youtube"
          title="First video"
          link="https://youtu.be/Ak1ACaqNtM0"
        />
      </div>
    </div>
  );
};

export default App;
