import React from "react";
import { NewsData } from "@/constDatas/NewsData";
import { NewsItemCard } from "@/components";

const NewsletterSection = ({ showAll = true }) => {
  return (
    <div className="px-5">
      <div className="flex flex-col gap-4 ">
        {NewsData?.slice(0, showAll ? NewsData.length : 2)?.map(
          (item, index) => (
            <NewsItemCard
              key={index}
              image={item?.image}
              title={item?.title}
              newsCategory={item?.newsCategory}
              date={item?.date}
              description={item?.description}
              slug={item?.slug}
            />
          )
        )}
      </div>
    </div>
  );
};

export default NewsletterSection;
