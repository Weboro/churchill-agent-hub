import { PatternBannerCard } from "@/components";
import React from "react";
import { staffDirectoryData } from "@/constDatas/staffDirectoryData";
import Image from "next/image";

const page = () => {
  return (
    <div>
      <PatternBannerCard title="Staff Directory" />

      <div className="container mx-auto px-5 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {staffDirectoryData.map((item, index) => (
          <div
            key={index}
            className="flex p-2 gap-2 items-center bg-neutral-50  hover:shadow border border-transparent hover:border-neutral-800/10 rounded-md px-4"
          >
            <div className="w-[80px] h-[80px] grid place-items-center ">
              <Image
                src={item.image}
                alt={item.title}
                width={80}
                height={80}
                className="w-[80px] h-[80px] object-cover rounded-full bg-red-900"
              />
            </div>

            <div className="text-wrap break-words flex-1 pt-1">
              <p className="capitalize text-xl font-bold pb-1`">{item.title}</p>
              <p className="capitalize">
                {item.department} | {item.position}
              </p>
              <p className="flex items-center gap-3 text-xl mt-1 text-matte-purple">
                <a
                  className="block leading-5 w-fit font-semibold hover:text-primary-orange"
                  href={`tel:${item.number}`}
                >
                  <i class="fi fi-sr-phone-call"></i>
                </a>
                <a
                  className="block leading-5 w-fit font-semibold hover:text-primary-orange"
                  href={`tel:${item.number}`}
                >
                  <i class="fi fi-sr-envelope"></i>
                </a>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default page;
