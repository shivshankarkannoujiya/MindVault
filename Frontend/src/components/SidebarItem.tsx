import type { ReactElement } from "react";

interface SidebarItemProps {
  text: string;
  icon: ReactElement;
  onClick: () => void;
  selected?: boolean;
}

const SidebarItem = ({ text, icon, onClick, selected }: SidebarItemProps) => {
  return (
    <div
      onClick={onClick}
      className={`flex items-center py-2 cursor-pointer rounded max-w-48 pl-4 transition-all duration-200 
      ${
        selected
          ? "bg-purple-100 text-purple-600 font-bold"
          : "text-gray-700 hover:bg-gray-100"
      }`}
    >
      <div className="pr-2">{icon}</div>
      <div className="">{text}</div>
    </div>
  );
};

export default SidebarItem;
