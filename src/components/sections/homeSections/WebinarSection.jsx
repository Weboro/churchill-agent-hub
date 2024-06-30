"use client";
import React, { useState } from "react";

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
  const [activeId, setActiveId] = useState(0);

  return (
    <div className="mx-auto container px-5">
      <div className="flex flex-col gap-8">
        <div className="flex items-center justify-center gap-4">
          {webinarData.map((item, index) => {
            const isCurrent = item.id === activeId ? true : false;
            return (
              <div
                key={index}
                className={`${
                  isCurrent
                    ? "before:absolute before:w-[90%] before:h-1 before:bottom-0 before:left-1/2 before:-translate-x-1/2 before:bg-primary-orange"
                    : ""
                } relative cursor-pointer font-bold px-4 pt-3 pb-2`}
                onClick={() => setActiveId(item.id)}
              >
                {item.title}
              </div>
            );
          })}
        </div>

        <div className="">
          {webinarData.map((item, index) => {
            if (item.id === activeId)
              return (
                <div
                  key={index}
                  className="shining-animation min-h-96 rounded-md"
                ></div>
              );
          })}
        </div>
      </div>
    </div>
  );
};

export default WebinarSection;
