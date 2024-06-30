import {
  HeroSection,
  NewsSection,
  AgentDataSection,
  WebinarSection,
  NewsLetterSection,
} from "@/components";
import React from "react";

const Home = () => {
  return (
    <main className="">
      <HeroSection />

      <div className="flex flex-col gap-[44px]">
        <AgentDataSection />

        <WebinarSection />

        <NewsSection />

        <NewsLetterSection />
      </div>
    </main>
  );
};

export default Home;
