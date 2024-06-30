import React from "react";

const TopBannerCard = ({ title, subTitle, titleSpan }) => {
  return (
    <div
      style={{
        backgroundImage: `linear-gradient(rgb(7 7 7 / 55%), rgb(7 7 7 / 55%) 100%), url(https://ik.imagekit.io/99aui81cz/diversity-teenagers-friends-friendship-team-concept.jpg?updatedAt=1717533378778)`,
        backgroundRepeat: "no-repeat",
        objectFit: "cover",
        width: "100%",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      className="lg:h-[50vh] h-[44vh] flex items-center"
    >
      <div className="container mx-auto px-5">
        <div className="flex flex-col gap-2 items-center">
          <h2 className="text-3xl md:text-5xl font-bold text-white text-center lg:max-w-[35ch]">
            <span className="text-[#eb9320]">{titleSpan}</span> {title}
          </h2>
          <div className="font-semibold text-white text-center mx-auto">
            {subTitle}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopBannerCard;
