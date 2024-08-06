"use client";
import React, { useEffect, useState } from "react";
import { NewsData } from "@/constDatas/NewsData";
import { NewsCategory } from "@/constDatas/NewsCategory";
import Image from "next/image";
import { fetchNews } from "@/query/apiQueries";
import { MoreNewsSection, Spiner } from "@/components";

const monthArray = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const NewsItemPage = ({ slug }) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);

    fetchNews(slug)
      .then((res) => {
        setData(res.data);
        setIsLoading(false);
      })
      .catch((err) => console.error(err));
  }, [slug]);

  // const item = NewsData?.find((item) => data?.slug === slug);

  const wordCount = data?.rich_text?.length;
  const readTime = Math.round(wordCount / 300);

  const newDate = new Date(data?.date);

  const day = newDate.getDate();

  const formattedDate = `${day}${
    day === 1 ? "st" : day === 2 ? "nd" : day === 3 ? "rd" : "th"
  } ${monthArray[newDate.getMonth()]} ${newDate.getFullYear()}`;

  return (
    <>
      {isLoading ? (
        <Spiner />
      ) : (
        <>
          <div className="container px-5 mx-auto mt-[32px]">
            <nav>
              <a className="font-semibold" href="/">
                Home
              </a>
              <span className="px-2">/</span>
              <a className="font-semibold" href="/news">
                News
              </a>
              <span className="px-2">/</span>
              <a href="#" className="font-semibold">
                {data?.title}
              </a>
            </nav>
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-7 mt-[32px] relative">
              <article className="lg:col-span-5">
                <h2 className="text-4xl lg:text-5xl font-bold">
                  {data?.title}
                </h2>

                <div className="mt-6">
                  <span>
                    {formattedDate} <span className="pr-2">|</span>
                  </span>
                  <span className="capitalize">
                    Read Time: {readTime} mins (~{wordCount} words)
                  </span>
                </div>

                <hr className="border border-black/10 mt-2 mb-4" />

                <div
                  className="rich-text-container flex flex-col gap-1"
                  dangerouslySetInnerHTML={{ __html: data?.description }}
                ></div>

                <Image
                  src={data?.image}
                  width={800}
                  height={600}
                  alt={data?.title}
                  className="w-full aspect-video rounded-md object-cover my-12"
                />

                <div
                  className="rich-text-container flex flex-col gap-1"
                  dangerouslySetInnerHTML={{ __html: data?.rich_text }}
                ></div>
                {/*  */}

                <div className="flex gap-2">
                  {data?.tags.map((item, index) => (
                    <div
                      className="bg-primary-orange/20 px-7 py-3 rounded-full font-semibold"
                      key={index}
                    >
                      {item?.name}
                    </div>
                  ))}
                </div>
              </article>

              <aside className="lg:col-span-2 w-full h-fit sticky top-6 left-0 flex flex-col gap-10">
                <MoreNewsSection pageSlug={slug} />

                <div className="flex flex-col gap-5 bg-neutral-50 p-4 shadow rounded-md">
                  <h4 className="text-xl font-bold highlight">
                    Browse Categories
                  </h4>
                  <div className="flex gap-3 flex-wrap">
                    {NewsCategory.map((item, index) => (
                      <div
                        className="bg-primary-orange/20 px-7 py-3 rounded-full font-semibold"
                        key={index}
                      >
                        {item?.title}
                      </div>
                    ))}
                  </div>
                </div>
              </aside>
            </div>
          </div>
          <div className="py-[32px]"></div>
        </>
      )}
    </>
  );
};

export default NewsItemPage;
