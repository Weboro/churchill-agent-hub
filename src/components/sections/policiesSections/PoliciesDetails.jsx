"use client";
import TopBannerCard from "@/components/cards/TopBannerCard";
import React, { useEffect, useState } from "react";
import { navItems } from "@/constDatas/navItems";
import { Spiner } from "@/components";
import { requestList } from "@/constDatas/requestList";

const PoliciesDetails = ({ slug }) => {
  const data = requestList?.find((item) => item?.slug === slug);
  console.log(data);

  return (
    <>
      <div className="flex flex-col gap-[32px] lg:gap-[64px]">
        <div>
          <TopBannerCard
            image={`${data?.CatagoriesItem?.image}`}
            titleSpan={``}
            title={`${data?.menuTitle}`}
            subTitle={`Student Hub > Request Form > ${data?.menuTitle}`}
          />
        </div>

        <div>
          <div className="flex flex-col gap-[32px] lg:gap-[64px]">
            <div className="container mx-auto px-5">
              <div
                className="rich-text-container"
                dangerouslySetInnerHTML={{
                  __html: data?.CatagoriesItem?.description,
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PoliciesDetails;
