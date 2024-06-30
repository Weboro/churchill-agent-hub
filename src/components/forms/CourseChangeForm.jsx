import React from "react";
import { FaArrowRight, FaIdCard } from "react-icons/fa";
import Button from "../button";

const CourseChangeForm = () => {
  return (
    <div>
      <form className="flex flex-col gap-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="flex flex-col gap-2">
            <label className="font-semibold">
              Student ID <span className="text-[#FF0000]">*</span>
            </label>
            <div className="relative">
              <span className="absolute right-5 top-3">
                <FaIdCard />
              </span>
              <input className="w-full h-auto font-inter text-[12px] text-[#021327] bg-transparent border border-[#ABABAB] outline-0 pl-8 pr-3 py-3 rounded-full" />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-semibold">
              Email <span className="text-[#FF0000]">*</span>
            </label>
            <div className="relative">
              <span className="absolute right-5 top-3">
                <FaIdCard />
              </span>
              <input className="w-full h-auto font-inter text-[12px] text-[#021327] bg-transparent border border-[#ABABAB] outline-0 pl-8 pr-3 py-3 rounded-full" />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-semibold">
              First Name <span className="text-[#FF0000]">*</span>
            </label>
            <div className="relative">
              <span className="absolute right-5 top-3">
                <FaIdCard />
              </span>
              <input className="w-full h-auto font-inter text-[12px] text-[#021327] bg-transparent border border-[#ABABAB] outline-0 pl-8 pr-3 py-3 rounded-full" />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-semibold">
              Last Name <span className="text-[#FF0000]">*</span>
            </label>
            <div className="relative">
              <span className="absolute right-5 top-3">
                <FaIdCard />
              </span>
              <input className="w-full h-auto font-inter text-[12px] text-[#021327] bg-transparent border border-[#ABABAB] outline-0 pl-8 pr-3 py-3 rounded-full" />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-semibold">
              Course Name <span className="text-[#FF0000]">*</span>
            </label>
            <div className="relative">
              <span className="absolute right-5 top-3">
                <FaIdCard />
              </span>
              <input className="w-full h-auto font-inter text-[12px] text-[#021327] bg-transparent border border-[#ABABAB] outline-0 pl-8 pr-3 py-3 rounded-full" />
            </div>
          </div>
        </div>
        <div className="flex justify-start">
          <Button btnName={"Apply"} icon={<FaArrowRight />} />
        </div>
      </form>
    </div>
  );
};

export default CourseChangeForm;
