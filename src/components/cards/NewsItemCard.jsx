import React from "react";
import Image from "next/image";
import Link from "next/link";
import Button from "../button";
import { FaArrowRight } from "react-icons/fa";

const monthArray = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const NewsItemCard = ({
  image,
  title,
  description,
  slug,
  catagories,
  date,
}) => {
  const newDate = new Date(date);

  const day = newDate.getDate();

  const formattedDate = `${day}${
    day === 1 ? "st" : day === 2 ? "nd" : day === 3 ? "rd" : "th"
  } ${monthArray[newDate.getMonth()]}`;

  return (
    <div className="group flex rounded-md border cursor-pointer bg-neutral-50 hover-shadow border-gray-500/40 overflow-hidden flex-col md:flex-row gap-3 ">
      <div className="relative">
        <div className="aspect-[4/2] md:w-[16rem] overflow-hidden md:aspect-auto md:h-full">
          <Image
            src={`${image}`}
            alt={"use-links-icon-image"}
            width={600}
            height={600}
            className="object-cover w-full h-full group-hover:scale-105 transition-all"
          />
        </div>
        <div className="absolute top-2 left-2 rounded-md flex gap-2 bg-primary-orange p-2 text-white font-bold ">
          <span>{formattedDate}</span>
        </div>
      </div>

      <div className="flex-1 py-4 md:py-6 px-4 flex flex-col justify-between gap-4">
        <Link href={`/news/${slug}`} className="w-fit">
          <h3 className="font-bold text-xl md:text-3xl text-[#2C2B4B] leading-[28px] line-clamp-3 transition-all hover:text-primary-orange">
            {title}
          </h3>
        </Link>

        <div
          dangerouslySetInnerHTML={{ __html: description }}
          className="line-clamp-4"
        />

        <Link href={`/news/${slug}`} className="w-fit">
          <Button
            icon={<FaArrowRight />}
            styleType="tertiary"
            styleA={"flex items-center gap-1"}
            btnName="Learn More"
          />
        </Link>

        <div className="flex flex-row flex-wrap gap-2">
          {catagories?.map((item, index) => (
            <p
              key={index}
              className="font-semibold bg-[#F2CF9C] text-[#2C2B4B] rounded-full text-[14px] px-3 py-1 h-fit"
            >
              {item?.title}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NewsItemCard;
