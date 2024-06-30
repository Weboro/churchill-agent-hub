import { NewsSection, TopBannerCard, AgentDetailCard } from "@/components";
import React from "react";
import { FaSearch } from "react-icons/fa";
import { usefulLinksData } from "@/constDatas/usefulLinksData";
import Link from "next/link";

export const metadata = {
  title: "Useful Links",
  // description: 'abcd',
  // metadataBase: new URL('https://sdsd.com.np'),
  // keywords: ['Next.js', 'React', 'JavaScript'],
  // openGraph: {
  //   images: '/og-image.png',
  // },
};
const UsefuLinks = () => {
  return (
    <main className="min-h-[80vh]">
      <div className="flex flex-col gap-[32px] lg:gap-[64px]">
        <div>
          <TopBannerCard
            image={`/assets/heroImage-2.jpeg
`}
            titleSpan={"Useful"}
            title={"Links"}
            subTitle={`Student Hub > Request Form > Useful Links`}
          />
        </div>
        <div className="container mx-auto px-5">
          <div className="flex flex-col gap-[32px] lg:gap-[64px]">
            <div className="flex justify-between gap-4 flex-col lg:flex-row items-center">
              <h2 className="font-bold text-[36px] text-matte-purple">
                Useful Links
              </h2>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-[34px] lg:gap-[34px]">
              {usefulLinksData?.map((item, index) => (
                <AgentDetailCard
                  icon={`${item?.icon}`}
                  subTitle={item?.subTitle}
                  title={item?.title}
                  url={`${item?.url}`}
                  key={index}
                />
              ))}
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

export default UsefuLinks;
