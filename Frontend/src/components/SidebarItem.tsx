import type { ReactElement } from "react";

interface SidebarItemProps {
  text: string;
  icon: ReactElement;
}

const SidebarItem = ({ text, icon }: SidebarItemProps) => {
  return (
    <div className="flex items-center py-2 cursor-pointer hover:bg-gray-100 rounded max-w-48 pl-4 transition-all duration-200">
      <div className="pr-2">{icon}</div>
      <div className="">{text}</div>
    </div>
  );
};

export default SidebarItem;
