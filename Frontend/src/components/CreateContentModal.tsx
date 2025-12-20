import { useRef, useState } from "react";
import CrossIcon from "../icons/CrossIcon";
import Button from "./Button";
import Input from "./Input";
import axios from "axios";
import { BACKEND_URL } from "../config";
import toast from "react-hot-toast";

interface CreateContentModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

type ContentType = "youtube" | "twitter";

const CreateContentModal = ({
  open,
  onClose,
  onSuccess,
}: CreateContentModalProps) => {
  const [loading, setLoading] = useState(false);
  const [type, setType] = useState<ContentType>("youtube");

  const titleRef = useRef<HTMLInputElement>(null);
  const linkRef = useRef<HTMLInputElement>(null);

  if (!open) return null;

  const addContent = async () => {
    const title = titleRef.current?.value;
    const link = linkRef.current?.value;

    if (!title || !link) {
      toast.error("Please fill in all fields");
      return;
    }

    setLoading(true);

    try {
      await axios.post(
        `${BACKEND_URL}/contents/create`,
        {
          title,
          link,
          type,
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      onSuccess();
      onClose();
      toast.success("Content added to your brain");
    } catch (error) {
      toast.error("Failed to add content");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
      <div className="bg-white w-full max-w-md p-6 rounded-xl shadow-2xl relative flex flex-col">
        <div
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-500 hover:text-black cursor-pointer transition-colors"
        >
          <CrossIcon />
        </div>

        <h2 className="text-xl font-bold text-center mb-6 text-slate-800">
          Add New Content
        </h2>

        <div className="flex flex-col gap-4">
          <Input
            ref={titleRef}
            type="text"
            label="Title"
            placeholder="Enter title"
          />
          <Input
            ref={linkRef}
            type="text"
            label="Link"
            placeholder="URL (YouTube or Twitter)"
          />

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-slate-700 ml-1">
              Content Type
            </label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value as ContentType)}
              className="w-full p-2.5 border border-slate-300 rounded-lg bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all cursor-pointer shadow-sm"
            >
              <option value="youtube">YouTube</option>
              <option value="twitter">Twitter</option>
            </select>
          </div>
        </div>

        <div className="flex justify-center mt-8">
          <Button
            onClick={addContent}
            varient="primary"
            text={loading ? "Submitting..." : "Submit Content"}
            className="w-full py-3"
            disabled={loading}
          />
        </div>
      </div>
    </div>
  );
};

export default CreateContentModal;
