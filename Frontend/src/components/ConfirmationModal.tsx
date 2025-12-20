import CrossIcon from "../icons/CrossIcon";
import WarningIcon from "../icons/WarningIcon";
import Button from "./Button";

interface ConfirmationModalProps {
  open: boolean;
  title: string;
  message: string;
  loading?: boolean;
  confirmText?: string;
  onClose: () => void;
  onConfirm: () => void;
}

const ConfirmationModal = ({
  open,
  onClose,
  onConfirm,
  title,
  message,
  loading,
  confirmText = "Confirm",
}: ConfirmationModalProps) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm transition-opacity">
      <div className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-sm mx-4 relative border border-gray-100 animate-fade-in-up">
        <div
          onClick={onClose}
          className="absolute top-4 right-4 cursor-pointer text-gray-500 hover:text-gray-800 transition"
        >
          <CrossIcon />
        </div>

        <div className="flex justify-center mb-4">
          <div className="bg-red-100 p-3 rounded-full text-red-600">
            <WarningIcon />
          </div>
        </div>

        <div className="text-center">
          <h2 className="text-xl font-bold mb-2 text-slate-800">{title}</h2>
          <p className="text-gray-500 text-sm mb-6">{message}</p>

          <div className="flex gap-3 justify-center">
            <div className="flex-1">
              <Button
                onClick={onClose}
                text="Cancel"
                varient="secondary"
                className="w-full justify-center cursor-pointer"
              />
            </div>
            <div className="flex-1">
              <Button
                onClick={onConfirm}
                text={loading ? `Processing...` : confirmText}
                varient="danger"
                className="w-full justify-center cursor-pointer"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
