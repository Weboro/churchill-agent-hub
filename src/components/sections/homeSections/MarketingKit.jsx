import React from "react";
import AgentDetailCard from "@/components/cards/AgentDetailCard";
import { MarketingKitData } from "@/constDatas/Links";

const MarketingKit = () => {
  return (
    <div className="container-blog mx-auto px-5">
      <div className="flex flex-col gap-[44px]">
        <h2 className="text-2xl font-bold">Marketing Kit</h2>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
          {MarketingKitData?.map((item, index) => (
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

export default MarketingKit;
