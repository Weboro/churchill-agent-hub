import React from "react";
import AgentDetailCard from "@/components/cards/AgentDetailCard";
import { usefulLinksData } from "@/constDatas/usefulLinksData";
// import Search from "@/components/Search";
import Button from "@/components/button";
import { FaArrowRight, FaSearch } from "react-icons/fa";
import Link from "next/link";
import { AgentHubData } from "@/constDatas/AgentHubData";

const AgentDataSection = () => {
  return (
    <div className="container mx-auto px-5">
      <div className="flex flex-col gap-[44px]">
        <div className="flex justify-between gap-4 flex-col lg:flex-row items-center">
          <h2 className="font-bold text-[36px] text-matte-purple">
            Agent Details
          </h2>
        </div>
        <div className="grid grid-cols-1 h-full lg:grid-cols-3 gap-6">
          {AgentHubData?.map((item, index) => (
            <AgentDetailCard
              key={index}
              icon={`${item?.icon}`}
              subTitle={item?.subTitle}
              title={item?.title}
              url={item?.link}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AgentDataSection;
