import TopBannerCard from "@/components/cards/TopBannerCard";
import React from "react";

const HeroSection = () => {
  return (
    <div>
      <TopBannerCard
        image={`/assets/heroImage-2.jpeg`}
        titleSpan={"AGENT"}
        title={"Hub"}
        subTitle={"Your Ultimate Resource for Academic Success!"}
      />
    </div>
  );
};

export default HeroSection;
