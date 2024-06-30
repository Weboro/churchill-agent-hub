"use client";
import React, { useEffect, useState } from "react";
import { navItems } from "@/constDatas/navItems";
import { Spiner } from "@/components";
import Link from "next/link";
import Image from "next/image";

const GuideDetails = ({ slug }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const delay = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(delay);
  }, [isLoading]);

  const [data, setData] = useState({});

  useEffect(() => {
    const info = navItems[1]?.Catagories?.find((item) => item?.slug === slug);
    setData(info?.CatagoriesItem);
  }, [slug]);

  return (
    <div>
      {isLoading ? (
        <div className="">
          <Spiner />
        </div>
      ) : (
        <>
          <article className="flex flex-col gap-6 mt-[64px]">
            <div className="container-blog flex flex-col gap-5">
              <nav className="font-semibold flex gap-1">
                <Link
                  className="hover:text-primary-orange transition-all"
                  href="/"
                >
                  Home
                </Link>
                /
                <Link
                  className="hover:text-primary-orange transition-all"
                  href="/how-to-guide"
                >
                  How To Guide
                </Link>
                / {data.title}
              </nav>
              <hr className="border-2 w-[60px]  border-primary-orange" />

              <h2 className="text-4xl leading-[40px] lg:text-6xl lg:leading-[62px] font-bold">
                {data.title}
              </h2>

              <h4 dangerouslySetInnerHTML={{ __html: data.subTitle }} />
            </div>

            <div className="container mx-auto">
              <Image
                width={2000}
                height={1500}
                src={data.image}
                alt={`event image for ${data.title}`}
                className="w-full aspect-[1.78/1] lg:w-[75%] mx-auto object-cover rounded-md"
              />
            </div>

            <div className="container-blog">
              <div
                className="rich-text-container"
                dangerouslySetInnerHTML={{ __html: data.description }}
              />
            </div>
          </article>
        </>
      )}
    </div>
  );
};

export default GuideDetails;
