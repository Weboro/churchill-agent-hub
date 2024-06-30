"use client";
import React, { useState } from "react";
import NavList from "./NavList";
import Link from "next/link";
import { CgMenuRight } from "react-icons/cg";
import { IoMdCloseCircleOutline } from "react-icons/io";
import Image from "next/image";

const MobileNav = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const [isDropdownActive, setIsDropdownActive] = useState(false);

  // width: 100vw; /* viewport width */
  // height: 100vh; /* viewport height */
  // overflow-y: scroll;
  // overflow-x: hidden;

  return (
    <div className="">
      <div className="z-40 fixed top-0 left-0 right-0 bottom-0 w-screen h-screen overflow-x-hidden overflow-y-scroll">
        <div className="flex justify-between gap-8 items-center px-[24px] py-2 shadow bg-white w-full">
          <div className="py-2">
            <Link href={"/"}>
              <Image
                src={"/assets/agent-hub-logo.svg"}
                width={400}
                height={400}
                alt="Main Logo"
                className="object-contain w-[200px]"
                priority
              />
            </Link>
          </div>
          <div className="">
            <div
              className="text-[44px]"
              onClick={() => {
                setOpenMenu(true);
              }}
            >
              <CgMenuRight />
            </div>
          </div>
        </div>
      </div>
      {openMenu && (
        <div className="w-full">
          <div
            className="z-40 fixed top-0 right-0 left-0 bottom-0 bg-[#fff] pl-8 pt-4 flex flex-col gap-[40px]"
            style={{
              animation: "sidebarAnimate linear 0.2s",
            }}
          >
            <Link
              href={"/"}
              className="flex justify-between gap-8 items-center"
            >
              <Image
                src={"/assets/agent-hub-logo.svg"}
                width={400}
                height={400}
                alt="Main Logo"
                className="object-contain w-[200px]"
                onClick={() => {
                  setOpenMenu(false);
                }}
                priority
              />
              <div
                className="pr-8 text-[32px] text-[#000]/[72%]"
                onClick={() => {
                  setOpenMenu(false);
                }}
              >
                <IoMdCloseCircleOutline />
              </div>
            </Link>
            <div className="flex flex-col gap-8">
              <NavList
                style={`flex flex-col gap-2`}
                handleOnclick={() => {
                  setOpenMenu(false);
                }}
                handleOnclickA={() => setIsDropdownActive((prev) => !prev)}
                isDropdownActive={isDropdownActive}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MobileNav;
