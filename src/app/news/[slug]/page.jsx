import React from "react";
import { NewsData } from "@/constDatas/NewsData";
import Image from "next/image";

const page = ({ params }) => {
  const { slug } = params;

  const pageData = NewsData?.find((item) => item.slug === slug);

  const wordCount = pageData?.description.length;
  const readTime = Math.round(wordCount / 300);

  return (
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
        <a className="font-semibold capitalize" href={`/news/${pageData.slug}`}>
          {pageData.slug.replaceAll("-", " ")}
        </a>
      </nav>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-5 mt-[32px] relative">
        <article className="lg:col-span-4">
          <h2 className="text-4xl lg:text-5xl font-bold">{pageData.title}</h2>

          <div className="mt-6">
            <span>
              {pageData.date} <span className="pr-2">|</span>
            </span>
            <span className="capitalize">
              {pageData.newsType} <span className="pr-2">|</span>
            </span>
            <span className="capitalize">
              {pageData.location} <span className="pr-2">|</span>
            </span>{" "}
            <span className="capitalize">
              Read Time: {readTime} mins (~{wordCount} words)
            </span>
          </div>
          <hr className="border border-black/10 mt-2 mb-4" />

          <div
            className="rich-text-container"
            dangerouslySetInnerHTML={{ __html: pageData.description }}
          ></div>
        </article>
        <aside>
          <div className="w-full h-fit sticky top-28 left-0">
            <h4 className="text-xl font-bold">Other News</h4>
            <div className="flex flex-col gap-4 mt-4">
              {NewsData?.slice(0, 3)?.map((item, index) => {
                if (item.slug != slug)
                  return (
                    <a
                      key={index}
                      href={`/news/${item.slug}`}
                      className="w-full"
                    >
                      <div className="bg-neutral-50 flex flex-col gap-4 rounded-md overflow-hidden hover:bg-slate-100 hover:shadow transition-all">
                        <Image
                          src={item?.image}
                          width={300}
                          height={300}
                          title={item?.title}
                          className="w-full h-[8rem] object-cover"
                        />

                        <div className="px-4 py-2 flex flex-col ">
                          <p className="text-sm">
                            <span>
                              {item?.date} <span className="pr-2">|</span>
                            </span>
                            <span className="capitalize">{item?.newsType}</span>
                          </p>

                          <h3 className="font-bold text-xl">{item?.title}</h3>
                        </div>
                      </div>
                    </a>
                  );
              })}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default page;
