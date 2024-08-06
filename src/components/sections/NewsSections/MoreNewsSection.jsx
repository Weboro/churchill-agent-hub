"use client";
import { fetchNews } from "@/query/apiQueries";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const MoreNewsSection = ({ pageSlug }) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);

    fetchNews()
      .then((res) => {
        setData(res.data);
        setIsLoading(false);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="flex flex-col gap-5 bg-neutral-50 p-4 shadow rounded-md">
      <h4 className="text-xl font-bold highlight">Other News</h4>
      <div className="flex flex-col gap-4 mt-4">
        {data?.slice(0, 3)?.map((item, index) => {
          if (item?.slug != pageSlug)
            return (
              <a key={index} href={`/news/${item?.slug}`} className="w-full">
                <div className=" flex items-start gap-[2px] rounded-md overflow-hidden hover:shadow transition-all">
                  <Image
                    src={item?.image}
                    width={300}
                    height={300}
                    alt={item?.title}
                    className="w-[6rem] aspect-square object-cover"
                  />
                  <div className="px-4 py-2 flex flex-col ">
                    <div className="text-sm">
                      <span>
                        {item?.date} <span className="pr-2">|</span>
                      </span>

                      <span className="capitalize">
                        {item?.newsCategory?.map((item, index) => (
                          <span key={index} className="pr-2 last:p-0">
                            {item}
                          </span>
                        ))}
                      </span>
                    </div>
                    <h3 className="font-bold text-xl line-clamp-3">
                      {item?.title}
                    </h3>
                  </div>
                </div>
              </a>
            );
        })}
      </div>
    </div>
  );
};

export default MoreNewsSection;
