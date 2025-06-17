"use client";
import React, { useState } from "react";

import { UpcomingWebinarSection, RecordedWebinarSection } from "@/components";

const webinarData = [
  {
    id: 0,
    title: "Upcoming Webinar",
    content: "",
  },
  {
    id: 1,
    title: "Recorded Webinar",
    content: "",
  },
];

const WebinarSection = () => {
  const [activeTitle, setActiveTitle] = useState("Upcoming Webinar");

  return (
    <div className="mx-auto container px-5">
      <div className="flex flex-col gap-8">
        <div className="flex items-center justify-center gap-4">
          {webinarData.map((item, index) => {
            const isCurrent = item.title === activeTitle ? true : false;

            return (
              <div
                key={index}
                className={`${
                  isCurrent
                    ? "before:absolute before:w-[90%] before:h-1 before:bottom-0 before:left-1/2 before:-translate-x-1/2 before:bg-primary-orange"
                    : ""
                } relative cursor-pointer font-bold px-4 pt-3 pb-2 text-center`}
                onClick={() => setActiveTitle(item.title)}
              >
                {item.title}
              </div>
            );
          })}
        </div>

        <div>
          {activeTitle === "Upcoming Webinar" ? (
            <UpcomingWebinarSection />
          ) : (
            <RecordedWebinarSection />
          )}
        </div>
      </div>
    </div>
  );
};

export default WebinarSection;
