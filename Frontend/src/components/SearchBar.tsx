import type React from "react";
import Input from "./Input";
import SearchIcon from "../icons/SearchIcon";

interface SearchBarProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchBar = ({ value, onChange }: SearchBarProps) => {
  return (
    <div className="relative w-full sm:w-64">
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500">
        <SearchIcon />
      </div>
      <Input
        value={value}
        onChange={onChange}
        placeholder="Search your brain..."
        className="pl-10 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
      />
    </div>
  );
};

export default SearchBar;
