import Button from "@/components/button";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaArrowRight } from "react-icons/fa";

const NewsLetterSection = () => {
  return (
    <div className="container px-5 relative mx-auto mb-[48px] rounded-md group ">
      <div className="flex flex-col md:flex-row bg-[#F3E4E4] relative overflow-hidden hover-shadow rounded-md">
        <div className="flex z-[10] flex-1 flex-col gap-6 pt-8 pl-8 md:py-20 md:pl-20">
          <h3 className="relative leading-10 font-bold text-[36px]  text-[#2C2B4B]">
            Join our <br /> Newsletter
          </h3>
          <p>Get updated about our latest news, events, updates and more.</p>
          <Link
            href={`https://zfrmz.com.au/DtG2T10jdX7f8egPhVzt`}
            target="_blank"
            className="w-max"
          >
            <Button
              btnName={"Subscribe to our Newsletter"}
              icon={<FaArrowRight />}
            />
          </Link>
        </div>
        <div className="flex-1 pb-48 md:flex-0">
          <Image
            width={600}
            height={600}
            className="absolute z-[0] translate-y-1/2 translate-x-1/2 bottom-16 -left-1/2 md:left-auto md:right-48 group-hover:scale-105 transition-all"
            src="/assets/churchil-circle.webp"
            alt="alt image for churchil circle"
          />
        </div>
      </div>
    </div>
  );
};

export default NewsLetterSection;
