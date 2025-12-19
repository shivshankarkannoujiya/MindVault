import Logo from "../icons/Logo";
import XIcon from "../icons/XIcon";
import YoutubeIcon from "../icons/YoutubeIcon";
import SidebarItem from "./SidebarItem";


const SideBar = () => {
  return (
    <div className="h-screen bg-white border border-r-gray-200 w-72 fixed left-0 top-0 pl-6">
      <div className="flex items-center gap-2 text-2xl font-bold pt-8">
        <div className="text-purple-600">
          <Logo />
        </div>
        BrainVault
      </div>

      <div className="pt-8 pl-4">
        <SidebarItem icon={<XIcon />} text="Twitter" />
        <SidebarItem icon={<YoutubeIcon />} text="YouTube" />
      </div>
    </div>
  );
};

export default SideBar;
