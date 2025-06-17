import React from "react";
import { FaSearch } from "react-icons/fa";

const Search = () => {
  return (
    <div>
      <div className="relative">
        <span className="absolute right-3 top-3 text-[20px] flex items-center justify-center text-black/65">
          <FaSearch />
        </span>
        <input
          type="text"
          placeholder="Search for links"
          className="w-full h-auto font-inter text-[12px] text-[#021327] bg-transparent border border-[#ABABAB] outline-0 pr-8 pl-3 py-3 rounded-full"
        />
      </div>
    </div>
  );
};

export default Search;
