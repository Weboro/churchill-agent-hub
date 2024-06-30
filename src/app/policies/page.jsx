import { NewsSection, RequestFormCard, TopBannerCard } from "@/components";
import React from "react";
import { navItems } from "@/constDatas/navItems";
import { requestList } from "@/constDatas/requestList";
import Link from "next/link";

export const metadata = {
  title: "Policies",
  // description: 'abcd',
  // metadataBase: new URL('https://sdsd.com.np'),
  // keywords: ['Next.js', 'React', 'JavaScript'],
  // openGraph: {
  //   images: '/og-image.png',
  // },
};
const PoliciesList = () => {
  return (
    <main className="min-h-[80vh]">
      <div className="flex flex-col gap-[32px] lg:gap-[64px]">
        <div>
          <TopBannerCard
            image={`/assets/heroImage-2.jpeg`}
            titleSpan={""}
            title={"Policies and Procedures"}
            subTitle={
              <p className="text-white">
                <Link href="/" className="text-white">
                  Student Hub
                </Link>
                <span> / Policies and Procedures</span>
              </p>
            }
          />
        </div>

        <div className="container mx-auto px-5">
          <div className="flex flex-col gap-[44px]">
            <h2 className="font-bold text-[36px] text-custom-text-black">
              Policies
            </h2>
            <div className="">
              <div className="flex flex-col gap-5">
                {requestList?.map((item, index) => (
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
          </div>
        </div>

        <div>
          <NewsSection />
        </div>
      </div>
    </main>
  );
};

export default PoliciesList;
