import React from "react";
import { NewsData } from "@/constDatas/NewsData";
import NewsItemCard from "@/components/cards/NewsItemCard";

const NewsSection = ({ showAll = true }) => {
  return (
    <div className="container mx-auto px-5">
      <h2 className="text-3xl font-bold mb-12">Browse Latest News</h2>

      <div className="flex flex-col gap-4 ">
        {NewsData?.slice(0, showAll ? NewsData.length : 2)?.map(
          (item, index) => (
            <NewsItemCard
              key={index}
              image={item?.image}
              title={item?.title}
              newsType={item?.newsType}
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

export default NewsSection;
