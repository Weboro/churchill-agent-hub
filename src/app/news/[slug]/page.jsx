import React from "react";
import { NewsData } from "@/constDatas/NewsData";
import { NewsCategory } from "@/constDatas/NewsCategory";
import Image from "next/image";

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

const page = ({ params }) => {
  const { slug } = params;

  const item = NewsData?.find((item) => item.slug === slug);

  const wordCount = item?.description.length;
  const readTime = Math.round(wordCount / 300);

  const newDate = new Date(item.date);

  const day = newDate.getDate();

  const formattedDate = `${day}${
    day === 1 ? "st" : day === 2 ? "nd" : day === 3 ? "rd" : "th"
  } ${monthArray[newDate.getMonth()]} ${newDate.getFullYear()}`;

  return (
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
          <a className="font-semibold capitalize" href={`/news/${item.slug}`}>
            {item.slug.replaceAll("-", " ")}
          </a>
        </nav>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-7 mt-[32px] relative">
          <article className="lg:col-span-5">
            <h2 className="text-4xl lg:text-5xl font-bold">{item.title}</h2>

            <div className="mt-6">
              <span>
                {formattedDate} <span className="pr-2">|</span>
              </span>
              <span className="capitalize">
                {item.newsCategory} <span className="pr-2">|</span>
              </span>
              <span className="capitalize">
                {item.location} <span className="pr-2">|</span>
              </span>
              <span className="capitalize">
                Read Time: {readTime} mins (~{wordCount} words)
              </span>
            </div>

            <hr className="border border-black/10 mt-2 mb-4" />

            <Image
              src={item.image}
              width={800}
              height={600}
              alt={item.title}
              className="w-full aspect-video rounded-md object-cover my-12"
            />

            <div
              className="rich-text-container flex flex-col gap-1"
              dangerouslySetInnerHTML={{ __html: item.description }}
            ></div>
          </article>

          <aside className="lg:col-span-2 w-full h-fit sticky top-6 left-0 flex flex-col gap-10">
            <div className="flex flex-col gap-5 bg-neutral-50 p-4 shadow rounded-md">
              <h4 className="text-xl font-bold highlight">Other News</h4>
              <div className="flex flex-col gap-4 mt-4">
                {NewsData?.slice(0, 3)?.map((item, index) => {
                  if (item.slug != slug)
                    return (
                      <a
                        key={index}
                        href={`/news/${item.slug}`}
                        className="w-full"
                      >
                        <div className=" flex items-start gap-[2px] rounded-md overflow-hidden hover:shadow transition-all">
                          <Image
                            src={item?.image}
                            width={300}
                            height={300}
                            title={item?.title}
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
            <div className="flex flex-col gap-5 bg-neutral-50 p-4 shadow rounded-md">
              <h4 className="text-xl font-bold highlight">Browse Categories</h4>
              <div className="flex gap-3 flex-wrap">
                {NewsCategory.map((item, index) => (
                  <div
                    className="bg-primary-orange/20 px-7 py-3 rounded-full font-semibold"
                    key={index}
                  >
                    {item.title}
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
      <div className="py-[32px]"></div>
    </>
  );
};

export default page;
