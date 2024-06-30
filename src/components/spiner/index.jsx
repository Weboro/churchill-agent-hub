import Image from "next/image";
import React from "react";

const Spiner = () => {
  return (
    <div className="spinner_main">
      <div className="logo_main">
        {/* <Image
          src={``}
          alt="spinner"
          className=""
        /> */}
        <Image
          src={"/assets/agent-hub-logo.svg"}
          width={400}
          height={400}
          alt="spinner"
          className="spinner_logo"
          priority
        />
      </div>
    </div>
  );
};

export default Spiner;
