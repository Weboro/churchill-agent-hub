import React from "react";
import { NewsSection } from "@/components";

const NewsPage = () => {
  return (
    <div className="mt-12 container mx-auto px-5">
      <div className="flex items-center gap-4  mb-12">
        <nav>
          <a className="font-semibold" href="/">
            Home
          </a>
          <span className="px-2">/</span>
          <a className="font-semibold" href="/news">
            News
          </a>
        </nav>
        <h2 className="text-3xl font-bold w-fit mx-auto text-center">
          Latest News
        </h2>
      </div>

      <NewsSection />
    </div>
  );
};

export default NewsPage;
