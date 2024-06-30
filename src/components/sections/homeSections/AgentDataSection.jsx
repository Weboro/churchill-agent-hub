import React from "react";
import AgentDetailCard from "@/components/cards/AgentDetailCard";
import { AgentHubData } from "@/constDatas/AgentHubData";

const AgentDataSection = () => {
  return (
    <div className="container-blog mx-auto px-5">
      <div className="flex flex-col gap-[44px]">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
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
