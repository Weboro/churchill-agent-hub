import { NewsSection, RequestFormCard, TopBannerCard } from "@/components";
import React from "react";
import { navItems } from "@/constDatas/navItems";
import Link from "next/link";

export const metadata = {
  title: "Request Form",
  // description: 'abcd',
  // metadataBase: new URL('https://sdsd.com.np'),
  // keywords: ['Next.js', 'React', 'JavaScript'],
  // openGraph: {
  //   images: '/og-image.png',
  // },
};

const RequestFormPage = () => {
  const requestLists = navItems[3].Catagories;

  return (
    <main className="min-h-[80vh]">
      <div className="flex flex-col gap-[32px] lg:gap-[64px]">
        <div>
          <TopBannerCard
            image={`/assets/heroImage-2.jpeg`}
            titleSpan={""}
            title={"Request Form"}
            subTitle={
              <p className="text-white">
                <Link href="/" className="text-white">
                  Student Hub
                </Link>
                <span> / Request Form</span>
              </p>
            }
          />
        </div>
        <div className="container mx-auto px-5">
          <div className="flex flex-col gap-[44px]">
            <h2 className="font-bold text-[36px] text-matte-purple">
              Request Form
            </h2>
            <div className="">
              <div className="flex flex-col gap-5">
                {requestLists?.map((item, index) => (
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

export default RequestFormPage;
