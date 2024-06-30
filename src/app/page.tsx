import {
  HeroSection,
  NewsSection,
  AgentDataSection,
  WebinarSection,
} from "@/components";
import React from "react";

const Home = () => {
  return (
    <main className="">
      <div className="flex flex-col gap-[32px] lg:gap-[64px]">
        <div className="">
          <HeroSection />
        </div>
        <div>
          <AgentDataSection />
        </div>
        <div className="">
          <WebinarSection />
        </div>
        <div>
          <NewsSection />
        </div>
      </div>
    </main>
  );
};

export default Home;
