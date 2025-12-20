import CrossIcon from "../icons/CrossIcon";
import Button from "./Button";
import Input from "./Input";
import { useEffect, useState } from "react";

interface ShareLinkModalProps {
  open: boolean;
  onClose: () => void;
  onDisableShare: () => void;
  shareUrl: string;
}

const ShareLinkModal = ({
  open,
  onClose,
  shareUrl,
  onDisableShare,
}: ShareLinkModalProps) => {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (open) {
      setCopied(false);
    }
  }, [open]);

  if (!open) return null;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
    } catch (error) {
      console.error("Failed to copy:", error);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-md mx-4 relative border border-gray-100">
        <div
          onClick={onClose}
          className="absolute top-4 right-4 cursor-pointer text-gray-500 hover:text-gray-800 transition"
        >
          <CrossIcon />
        </div>

        <div className="text-center mt-2">
          <h2 className="text-xl font-bold mb-6 text-slate-800">
            Broadcast the URL
          </h2>

          <div className="flex items-center gap-2 mb-6">
            <div className="flex-1">
              <Input
                value={shareUrl}
                readOnly={true}
                placeholder={`Generating link...`}
              />
            </div>

            <div className="w-28">
              <Button
                onClick={handleCopy}
                text={copied ? `Copied!` : `Copy`}
                varient="primary"
                className="w-full justify-center cursor-pointer"
              />
            </div>
          </div>

          <div className="border-t border-gray-100 pt-4">
            <Button
              onClick={() => {
                onDisableShare();
                onClose();
              }}
              varient="danger"
              text="Stop Sharing"
              className="w-full justify-center font-medium cursor-pointer"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShareLinkModal;
