import React from "react";

const TopBannerCard = () => {
  return (
    <div
      style={{
        backgroundImage: `linear-gradient(to top, white, #00000000), url('/assets/hero-vector.svg')`,
        backgroundRepeat: "no-repeat",
        objectFit: "cover",
        width: "100%",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      className="lg:h-[50vh] h-[44vh] flex items-center"
    >
      <div className="container mx-auto px-5">
        <div className="flex flex-col gap-8 ">
          <h2 className="text-3xl md:text-5xl font-bold text-center text-[#eb9320]">
            How can we Help you?
          </h2>
          <div className="relative bg-neutral-100  rounded-full md:w-[24rem] md:mx-auto overflow-hidden">
            <input
              type="text"
              placeholder="Search."
              className="w-full h-full px-6 py-4 outline-none transparent-background "
            />
            <div className="h-12 w-12 absolute top-1/2 -translate-y-1/2 right-0 grid place-items-center rounded-full bg-primary-orange">
              <i class="fi fi-br-search flex"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopBannerCard;
