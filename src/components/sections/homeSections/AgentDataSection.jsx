import React from "react";
import AgentDetailCard from "@/components/cards/AgentDetailCard";
import { QuickLinksData } from "@/constDatas/Links";

const AgentDataSection = () => {
  return (
    <div className="container-blog mx-auto px-5">
      <div className="flex flex-col gap-[44px]">
        <h2 className="text-2xl font-bold">Quick Actions</h2>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {QuickLinksData?.map((item, index) => (
            <AgentDetailCard
              key={index}
              icon={`${item?.icon}`}
              subTitle={item?.subTitle}
              title={item?.title}
              url={item?.link}
              redirect={item?.redirect}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AgentDataSection;
