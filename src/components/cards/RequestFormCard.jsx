import React from "react";
import { FaArrowRight, FaIdCard } from "react-icons/fa";
import Link from "next/link";
import Button from "../button";

const RequestFormCard = ({
  icon,
  menuTitle,
  subTitle,
  link,
  slug,
  btnTitle,
  target,
  iconStyles,
}) => {
  return (
    <li className="px-4 py-3 hover:shadow-sm  bg-[#E9E9E9] rounded-md flex justify-between gap-2 items-center">
      <div className="flex gap-3 items-center">
        <div className="bg-white rounded-full w-12 h-12 grid place-items-center">
          <i
            className={`text-2xl text-primary-orange translate-y-[2px] ${iconStyles}`}
          />
        </div>
        <div className="flex flex-col gap-1">
          <span className="font-bold">{menuTitle}</span>
          <span>{subTitle}</span>
        </div>
      </div>
      <Link target={link ? "_blank" : target} href={`${link ? link : slug}`}>
        <Button
          btnName={<span className="hidden md:block">Learn More</span>}
          icon={<FaArrowRight />}
          styleA={"flex items-center gap-1"}
        />
      </Link>
    </li>
  );
};

export default RequestFormCard;
