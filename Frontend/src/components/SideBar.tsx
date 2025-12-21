import { useAuth } from "../context/AuthProvider";
import GridIcon from "../icons/GridIcon";
import Logo from "../icons/Logo";
import LogoutIcon from "../icons/LogoutIcon";
import XIcon from "../icons/XIcon";
import YoutubeIcon from "../icons/YoutubeIcon";
import SidebarItem from "./SidebarItem";

interface SideBarProps {
  selectedType: "all" | "twitter" | "youtube";
  onSelect: (type: "all" | "twitter" | "youtube") => void;
}

const SideBar = ({ selectedType, onSelect }: SideBarProps) => {
  const { user, logout } = useAuth();

  return (
    <div className="fixed left-0 top-0 w-72 h-screen bg-white border-r border-gray-200 p-6 hidden md:flex flex-col justify-between">
      <div>
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

      {user && (
        <div className="flex items-center gap-3 p-3 border-t border-gray-200 mt-4">
          <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 font-bold text-xl">
            {user.username[0].toUpperCase()}
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-bold text-gray-800">
              {user.username}
            </span>
            <span className="text-xs text-gray-500">{user.email}</span>
          </div>

          <button
            onClick={logout}
            className="p-2 text-red-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors duration-200 cursor-pointer"
            title="Logout"
            aria-label="Logout"
          >
            <LogoutIcon />
          </button>
        </div>
      )}
    </div>
  );
};

export default SideBar;
