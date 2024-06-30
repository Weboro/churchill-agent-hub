import Link from "next/link";
import React from "react";

const AgentDetailCard = ({ icon, title, subTitle, url }) => {
  return (
    <div className="bg-[#f4f6f7] hover:bg-[#f7f8f9] group cursor-pointer hover:shadow-sm transition-all px-4 py-6 rounded-md border-2">
      <Link href={`${url}`} target="_blank">
        <div className="flex flex-col gap-3 justify-center items-center cursor-pointer">
          <div className="w-[4.5rem] aspect-square rounded-full grid place-items-center bg-white group-hover:shadow-sm transition-all">
            <i className={`${icon} flex text-4xl text-primary-orange`}></i>
          </div>

          <h3 className="text-center font-semibold text-[18px]">{title}</h3>
          <p className="text-center">{subTitle}</p>
        </div>
      </Link>
    </div>
  );
};

export default AgentDetailCard;
