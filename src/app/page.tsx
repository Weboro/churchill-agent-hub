import {
  HeroSection,
  AgentDataSection,
  WebinarSection,
  NewsLetterSection,
  NewsSection,
  Button,
} from "@/components";

import React from "react";

const Home = () => {
  return (
    <main className="">
      <HeroSection />

      <div className="flex flex-col gap-[44px]">
        <AgentDataSection />

        <WebinarSection />

        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-12 w-fit mx-auto text-center">
            Browse Latest News
          </h2>

          <NewsSection showAll={false} />

          <a href="/news" className="block mt-10 mx-auto w-fit">
            <button className="bg-primary-orange px-6 py-4 font-bold rounded-md hover:scale-105 transition-all">
              Browse More News
            </button>
          </a>
        </div>

        <NewsLetterSection />
      </div>
    </main>
  );
};

export default Home;
