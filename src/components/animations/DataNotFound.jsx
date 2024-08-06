import React from "react";
import Lottie from "lottie-react";
import DataNotFoundAnimation from "@/constDatas/animations/data-not-found.json";

const DataNotFound = () => {
  return (
    <div className="mx-auto w-2/3 sm:w-1/2">
      {<Lottie animationData={DataNotFoundAnimation} loop={true} />}
    </div>
  );
};

export default DataNotFound;
