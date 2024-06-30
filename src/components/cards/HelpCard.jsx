import React from "react";
import Button from "../button";
import { FaArrowRight } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";

const HelpCard = ({ title, description, image }) => {
  return (
    <div className="bg-light-grey rounded-[32px] px-8 pt-[32px] lg:pb-0 pb-[32px] flex flex-col gap-5">
      <h2 className="font-bold text-[36px] text-matte-purple">{title}</h2>
      <p>{description}</p>
      <div>
        <Link
          target="blank"
          href={
            "https://forms.zohopublic.com.au/CIHE/form/StudentHubEnquiry/formperma/XilFJje5kQ-h7f4saQYbSV4kJ-kAMiG7p1QNfWEvDXs"
          }
        >
          <Button
            btnName={"Fill Enquiry Form"}
            icon={<FaArrowRight />}
            isPrimary={true}
          />
        </Link>
      </div>
      <div className="hidden lg:block">
        <div className="flex justify-end">
          <Image
            src={`${image}`}
            alt={"use-links-icon-image"}
            width={400}
            height={400}
            className="w-[285px] h-[250px]"
          />
        </div>
      </div>
    </div>
  );
};

export default HelpCard;
