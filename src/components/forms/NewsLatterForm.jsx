import React from "react";
import { FaArrowRight, FaIdCard } from "react-icons/fa";
import Button from "../button";

const NewsLatterForm = () => {
  return (
    <div>
      <form className="flex flex-col gap-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="flex flex-col gap-2">
            <label className="font-semibold">
              First Name <span className="text-[#FF0000]">*</span>
            </label>
            <div className="relative">
              <span className="absolute right-5 top-3">
                {/* <FaIdCard /> */}
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
                {/* <FaIdCard /> */}
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
                {/* <FaIdCard /> */}
              </span>
              <input className="w-full h-auto font-inter text-[12px] text-[#021327] bg-transparent border border-[#ABABAB] outline-0 pl-8 pr-3 py-3 rounded-full" />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-semibold">
              I am a <span className="text-[#FF0000]">*</span>
            </label>
            <div>
              <select className="w-full h-auto font-inter text-[12px] text-[#021327] bg-[#f5f5f5] border border-[#ABABAB] outline-0 px-8 py-3 rounded-full">
                <option>-- Select here--</option>
                <option>High school student</option>
                <option>Non high School student</option>
                <option>Parent</option>
                <option>Educator / Careers Adviser</option>
              </select>
              {/* <input type="radio" className='w-[30px] h-[30px]'/> */}
            </div>
          </div>
        </div>
        <div>
          <div className="flex flex-col gap-5">
            <div className="flex gap-3 items-center">
              <input type="checkbox" className="h-[20px] w-[20px]" />
              <p>
                I agree to the privacy policy and to receive communications from
                UNSW Sydney<span className="text-[#FF0000]">*</span>
              </p>
            </div>
            <p>
              privacy policy and to receive communications from UNSW Sydney
              policy and to receive communications from UNSW Sydneypolicy and to
              receive communications from UNSW Sydney policy and to receive
              communications from UNSW Sydney policy and to receive
              communications from UNSW Sydneypolicy and to receive
              communications from UNSW Sydneypolicy and to receive
            </p>
          </div>
        </div>

        <div className="flex justify-start">
          <Button
            btnName={"Submit"}
            icon={<FaArrowRight />}
            styleA={"flex items-center gap-1"}
          />
        </div>
      </form>
    </div>
  );
};

export default NewsLatterForm;
