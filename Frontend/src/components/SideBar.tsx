import GridIcon from "../icons/GridIcon";
import Logo from "../icons/Logo";
import XIcon from "../icons/XIcon";
import YoutubeIcon from "../icons/YoutubeIcon";
import SidebarItem from "./SidebarItem";

interface SideBarProps {
  selectedType: "all" | "twitter" | "youtube";
  onSelect: (type: "all" | "twitter" | "youtube") => void;
}

const SideBar = ({ selectedType, onSelect }: SideBarProps) => {
  return (
    <div className="fixed left-0 top-0 w-72 h-screen bg-white border-r border-gray-200 p-6 hidden md:block">
      <div
        className="flex items-center gap-2 mb-8 cursor-pointer"
        onClick={() => onSelect("all")}
      >
        <div className="text-purple-600">
          <Logo />
        </div>
        <div className="text-xl font-bold text-gray-700">BrainVault</div>
      </div>

      <div className="flex flex-col gap-2">
        <SidebarItem
          text="All Brains"
          icon={<GridIcon />}
          selected={selectedType === "all"}
          onClick={() => onSelect("all")}
        />

        <SidebarItem
          text="Twitter"
          icon={<XIcon />}
          selected={selectedType === "twitter"}
          onClick={() => onSelect("twitter")}
        />

        <SidebarItem
          text="Youtube"
          icon={<YoutubeIcon />}
          selected={selectedType === "youtube"}
          onClick={() => onSelect("youtube")}
        />
      </div>
    </div>
  );
};

export default SideBar;
