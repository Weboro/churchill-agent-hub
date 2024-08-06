"use client";
import { useEffect, useState } from "react";
import { NewsData } from "@/constDatas/NewsData";
import { DataNotFound, NewsItemCard } from "@/components";
import { fetchNews } from "@/query/apiQueries";

const NewsSection = ({ showAll = false }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    setIsLoading(true);

    fetchNews()
      .then((res) => {
        setData(res.data);
        setIsLoading(false);
      })
      .catch((err) => console.error(err));
  }, []);

  const showitems = showAll ? data.length : 2;

  return (
    <div className="px-5">
      {!data.length > 0 ? (
        <DataNotFound />
      ) : (
        <div className="flex flex-col gap-4 ">
          {data?.slice(0, showitems)?.map((item, index) => (
            <NewsItemCard
              key={index}
              tags={item?.tags}
              title={item?.title}
              slug={item?.slug}
              date={item?.date}
              description={item?.description}
              rich_text={item?.rich_text}
              image={item?.image}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default NewsSection;
