"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";

const FloaterComponent = () => {
  const [openSearch, setOpenSearch] = useState(false);

  useEffect(() => {
    if (openSearch) {
      const script = document.createElement("script");
      script.async = true;
      script.src = "https://cse.google.com/cse.js?cx=820c819b7996d4c87";
      document.body.appendChild(script);

      return () => {
        document.body.removeChild(script);
      };
    }
  }, [openSearch]);

  return (
    <>
      <div className="hidden md:block fixed bottom-6 right-10 z-[10000] ">
        <button
          onClick={() => setOpenSearch(true)}
          className="bg-[#E59623] hover:bg-[#ff9700] hover:scale-110 transition-all cursor-pointers px-4 py-2 rounded-full border border-neutral-900/20 shadow-xl flex gap-3 font-bold"
        >
          <Image
            width={500}
            height={500}
            src="/assets/search.svg"
            alt="messages question icon"
            className="w-6"
          />
          Search
        </button>
      </div>

      {openSearch && (
        <div className="z-50 fixed top-0 left-0 right-0 bottom-0 bg-black/75">
          <div className="lg:mt-[15%] mt-[50%]">
            <div className="flex justify-center items-center">
              <div className="w-[80%] lg:w-[50%] h-fit ">
                <div className="gcse-search"></div>
              </div>
            </div>
          </div>

          <p
            className="absolute top-8 right-8 text-[#FF0000] text-4xl cursor-pointer"
            onClick={() => {
              setOpenSearch(false);
            }}
          >
            <i className="fi fi-rr-cross-small"></i>
          </p>
        </div>
      )}
    </>
  );
};

export default FloaterComponent;
