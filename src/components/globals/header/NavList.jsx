"use client";
import React, { useState } from "react";
import { FaAngleDown, FaSearch } from "react-icons/fa";
import TopInfo from "./TopInfo";
import { navItems } from "@/constDatas/navItems";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NavList = ({
  style,
  isDropdownActive,
  handleOnclickA,
  handleOnclick,
}) => {
  const pathname = usePathname();
  const [openSearch, setOpenSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchKeyPress = (event) => {
    if (event.key === "Enter") {
      window.open(`https://www.google.com/search?q=${searchQuery}`, "_blank");
      setOpenSearch(false);
    }
  };

  return (
    <div className="w-full flex flex-col gap-2 z-40 pt-5">
      <div className="hidden lg:block">
        <div className="flex justify-end">
          <TopInfo />
        </div>
      </div>

      <ul className={`${style ? style : ""}`}>
        {navItems?.map((item, index) => {
          const isActive =
            (pathname.includes(item?.slug) && item?.slug?.length > 1) ||
            pathname === item?.slug;

          return (
            <div key={index}>
              <Link href={`/${item?.slug}`}>
                <li
                  className={`flex gap-1 items-center hover:text-[#eb9320] ${
                    isActive && "text-[#eb9320]"
                  }  cursor-pointer pb-5`}
                >
                  <p>{item?.title}</p>
                </li>
              </Link>
            </div>
          );
        })}

        <li
          onClick={() => {
            setOpenSearch(true);
          }}
        >
          <div className="flex gap-1 items-center cursor-pointer">
            <span>Search</span> <FaSearch />
          </div>
        </li>

        {openSearch && (
          <div className="z-50 fixed top-0 left-0 w-full h-full bg-black/75">
            <div className="relative">
              <div className="w-[80%] lg:w-[50%] h-fit overflow-x-hidden z-50 fixed top-[50%] left-[50%] transform -translate-x-[50%] -translate-y-[50%] overflow-y-auto bg-white p-[11px] rounded-[25px] lg:rounded-[5px] shadow-xl shadow-cus">
                <div className="relative">
                  <span className="absolute right-3 top-3 text-[26px] cursor-pointer">
                    <FaSearch />
                  </span>
                  <input
                    placeholder="Search here..."
                    className="w-full h-auto font-inter text-[#021327] bg-transparent border border-[#ABABAB] outline-0 pl-3 pr-[44px] py-3 rounded-full"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyPress={handleSearchKeyPress}
                  />
                </div>
              </div>
              <p
                className="absolute top-8 right-8 text-[#FF0000] text-4xl cursor-pointer"
                onClick={() => {
                  setOpenSearch(false);
                }}
              >
                X
              </p>
            </div>
          </div>
        )}
      </ul>
    </div>
  );
};

export default NavList;
