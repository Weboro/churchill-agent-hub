import React from "react";
import RequestFormCard from "@/components/cards/RequestFormCard";
import Button from "@/components/button";
import { FaArrowRight, FaSearch } from "react-icons/fa";
import Link from "next/link";
import { requestList } from "@/constDatas/requestList";

const RequestFormSection = () => {
  return (
    <div className="container mx-auto px-5">
      <div className="flex flex-col gap-[44px]">
        <div>
          <div className="flex justify-between gap-4 flex-col lg:flex-row items-center">
            <h2 className="font-bold text-[36px] text-matte-purple">
              Request Form
            </h2>
          </div>
        </div>
        <div className="rounded-[32px]">
          <div className="flex flex-col gap-5">
            {requestList?.slice(0, 4).map((item, index) => (
              <RequestFormCard
                key={index}
                menuTitle={item?.menuTitle}
                subTitle={item?.subTitle}
                link={item?.link}
                slug={item?.slug}
                btnTitle={item?.btnTitle}
                target={item?.target}
                iconStyles={item?.iconStyles}
              />
            ))}
          </div>
        </div>
        <div className="flex justify-center">
          <Link href={"/request-form"}>
            <Button
              btnName={"Load More Links"}
              icon={<FaArrowRight />}
              styleType="secondary"
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RequestFormSection;
