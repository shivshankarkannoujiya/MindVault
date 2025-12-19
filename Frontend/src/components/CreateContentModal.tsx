import CrossIcon from "../icons/CrossIcon";
import Button from "./Button";
import Input from "./Input";

interface CreateContentModalProps {
  open: boolean;
  onClose: () => void;
}

const CreateContentModal = ({ open, onClose }: CreateContentModalProps) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
      <div className="bg-white w-full max-w-md p-6 rounded-xl shadow-2xl relative flex flex-col">
        <div
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-500 hover:text-black cursor-pointer transition-colors"
        >
          <div onClick={onClose}>
            <CrossIcon />
          </div>
        </div>

        {/* Title */}
        <h2 className="text-xl font-bold text-center mb-6">Add Content</h2>

        <div className="flex flex-col gap-4">
          <Input placeholder={`Title`} />
          <Input placeholder={`Link`} />
        </div>

        <div className="flex justify-center mt-6">
          <Button varient="primary" text="Submit" className="w-full" />
        </div>
      </div>
    </div>
  );
};

export default CreateContentModal;
