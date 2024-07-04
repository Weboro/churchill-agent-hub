"use client";
import React, { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import Image from "next/image";

const AccordionComponent = ({ data }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleToggle = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const [isFullScreenShown, setIsFullScreenShown] = useState(false);
  const [videoUrl, setVideoUrl] = useState("");

  return (
    <>
      <div className="flex flex-col rounded-md ">
        {data?.map((item, index) => {
          const isActive = activeIndex == index ? true : false;

          const videoUrl = item.youtubeIframe.split("v=")[1];

          return (
            <div key={index} className="border">
              <h2
                onClick={() => handleToggle(index)}
                className={`text-2xl py-4 px-4 font-bold flex items-center justify-between cursor-pointer select-none ${
                  index === activeIndex ? "bg-neutral-50" : ""
                }`}
              >
                <span>{item.title}</span>
                <span
                  className={`transition-all ${isActive ? "rotate-180" : ""}`}
                >
                  <IoIosArrowDown />
                </span>
              </h2>

              {activeIndex === index && (
                <div className="bg-neutral-50 p-4">
                  <div
                    className="py-2 mb-4 rich-text-container "
                    dangerouslySetInnerHTML={{ __html: item.description }}
                  />

                  <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
                    <div className="flex items-center gap-2">
                      <Image
                        width={300}
                        height={300}
                        src={item.person.photo}
                        alt={item.title}
                        className="w-20 h-20 object-cover rounded-full"
                      />
                      <div>
                        <p className="text-lg font-bold">{item.person.name}</p>
                        <p>{item.person.post}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        setVideoUrl(videoUrl);
                        setIsFullScreenShown(!isFullScreenShown);
                      }}
                      className="bg-primary-orange rounded-lg px-8 py-3 font-bold"
                    >
                      Watch Now
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {isFullScreenShown && (
        <div className="fixed z-50 w-screen h-screen top-0 left-0 bg-black/60">
          <div className="w-full h-full grid place-items-center">
            <iframe
              width="100"
              height="600"
              src={`https://www.youtube.com/embed/${videoUrl}`}
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerpolicy="strict-origin-when-cross-origin"
              allowfullscreen
              className="w-[80%] aspect-square md:aspect-[16/9]"
            ></iframe>
          </div>

          <button
            onClick={() => {
              setIsFullScreenShown(!isFullScreenShown);
              setVideoUrl("");
            }}
            className="absolute right-12 top-8 text-white text-xl"
          >
            <i className="fi fi-br-cross flex"></i>
          </button>
        </div>
      )}
    </>
  );
};

export default AccordionComponent;
