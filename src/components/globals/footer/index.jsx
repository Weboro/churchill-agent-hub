import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaPhoneAlt, FaUser } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";

const Footer = () => {
  return (
    <div className="mt-[32px] lg:mt-[64px]">
      <div
        className="bg-[#606060] py-[64px]"
        style={{
          backgroundImage: `url(${`/assets/footer-watermark.png`})`,
          backgroundRepeat: "no-repeat",
          objectFit: "cover",
          width: "100%",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="mx-auto container px-5">
          <div className="flex flex-col gap-8">
            <div className="flex flex-col items-center lg:flex-row justify-between gap-4">
              <Link href="/">
                <Image
                  src={"/assets/agent-hub-logo.svg"}
                  width={400}
                  height={400}
                  alt="Footer Logo"
                  className="object-contain w-[300px] lg:w-[650px] h-auto brightness-0 invert"
                  priority
                />
              </Link>
              <div className="text-white flex flex-col gap-2">
                <h3 className="text-[16px] text-white">
                  <strong>Churchill Institute of Higher Education</strong>
                </h3>

                <Link
                  href={""}
                  className="flex gap-2 text-white items-center text-[14px]"
                >
                  <span>
                    <FaPhoneAlt />
                  </span>
                  +61 (02) 8856 2997
                </Link>
                <Link
                  href={""}
                  className="flex gap-2 text-white items-center text-[14px]"
                >
                  <span>
                    <MdEmail />
                  </span>
                  info@churchill.nsw.edu.au
                </Link>
                <p className="flex gap-2 text-white items-center text-[14px]">
                  <span>
                    <FaLocationDot />
                  </span>
                  Level 1, 16-18 Wentworth Street Parramatta NSW 2150
                </p>
              </div>
            </div>
            {/* <div className="flex flex-col lg:flex-row justify-between gap-5 text-white">
              <div>
                <h3 className="text-[16px] pb-4">
                  <strong>Quick Links</strong>
                </h3>
                <ul className="flex flex-col gap-1 text-[14px]">
                  <li>
                    <Link href={""}> CIHE Governance Structure</Link>
                  </li>
                  <li>
                    <Link href={""}> CIHE Organisational Chart</Link>
                  </li>
                  <li>
                    <Link href={""}> Governance and Leadership</Link>
                  </li>
                  <li>
                    <Link href={""}> Company and Financial Documents</Link>
                  </li>
                  <li>
                    <Link href={""}> Policies and Procedures</Link>
                  </li>
                  <li>
                    <Link href={""}> Accreditation</Link>
                  </li>
                  <li>
                    <Link href={""}> Approved Agents</Link>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-[16px] pb-4">
                  <strong>Courses</strong>
                </h3>
                <ul className="flex flex-col gap-1 text-[14px]">
                  <li>
                    <Link href={""}>Accounting Major</Link>
                  </li>
                  <li>
                    <Link href={""}>Major in Information Systems</Link>
                  </li>
                  <li>
                    <Link href={""}>Major in Hospitality</Link>
                  </li>
                  <li>
                    <Link href={""}>Major in Management</Link>
                  </li>
                  <li>
                    <Link href={""}> Policies and Procedures</Link>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-[16px] pb-4">
                  <strong>Apply</strong>
                </h3>
                <ul className="flex flex-col gap-1 text-[14px]">
                  <li>
                    <Link href={""}>CApply to study at CIHE</Link>
                  </li>
                  <li>
                    <Link href={""}>Entry Requirements Domestic Students</Link>
                  </li>
                  <li>
                    <Link href={""}>
                      Entry Requirements International Students
                    </Link>
                  </li>
                  <li>
                    <Link href={""}>
                      Mature-age Admission Entry Arrangements
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-[16px] pb-4">
                  <strong>Students</strong>
                </h3>
                <ul className="flex flex-col gap-1 text-[14px]">
                  <li>
                    <Link href={""}>Feed & Charges</Link>
                  </li>
                  <li>
                    <Link href={""}>Student Handbook</Link>
                  </li>
                  <li>
                    <Link href={""}>Campus Facilities</Link>
                  </li>
                  <li>
                    <Link href={""}>Study in Australia</Link>
                  </li>
                  <li>
                    <Link href={""}>FAQ’s</Link>
                  </li>
                  <li>
                    <Link href={""}>Payment Method</Link>
                  </li>
                  <li>
                    <Link href={""}>Grievance Form</Link>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-[16px] pb-4">
                  <strong>Login</strong>
                </h3>
                <ul className="flex flex-col gap-1 text-[14px]">
                  <li>
                    <Link href={""}>Student Hub</Link>
                  </li>
                  <li>
                    <Link href={""}>Staff Login</Link>
                  </li>
                  <li>
                    <Link href={""}>Library</Link>
                  </li>
                  <li>
                    <Link href={""}>Student Portal</Link>
                  </li>
                </ul>
              </div> */}
            {/* </div> */}
          </div>
        </div>
      </div>
      <div className="bg-primary-orange pt-[64px]">
        <div className="container mx-auto px-5">
          <div className="flex flex-col lg:flex-row  justify-between gap-5 pb-[54px]">
            <div className="lg:w-[60%] flex flex-col lg:flex-row gap-4 lg:items-center">
              <div className="flex gap-1 items-center justify-center md:justify-start">
                <Image
                  src={"/assets/flag-a.png"}
                  width={400}
                  height={400}
                  alt="Footer Logo"
                  className="object-contain w-[50px] h-auto"
                  priority
                />
                <Image
                  src={"/assets/flag-b.png"}
                  width={400}
                  height={400}
                  alt="Footer Logo"
                  className="object-contain w-[50px] h-auto"
                  priority
                />
              </div>
              <p className="w-[90%] text-center md:text-left">
                CIHE acknowledges Aboriginal and Torres Strait Islander people
                as the Traditional Custodians of the land and acknowledges and
                pays respect to their elders, past and present
              </p>
            </div>
            <div className="">
              <div className="flex flex-col gap-2 text-center md:text-left">
                <h3 className="text-[16px]">
                  <strong>Churchill Institute of Higher Education</strong>
                </h3>
                <p className="text-[14px]">CRICOS Provider Code 04082E</p>
                <p className="text-[14px]">TEQSA Provider Number PRV14305</p>
                <p className="text-[14px]">ABN 91 612 507 141</p>
              </div>
            </div>
          </div>
          <hr />
          <p className="text-center container mx-auto px-5 font-semibold text-[15px] py-4">
            Copyright © 2024 Mpika Holdings Pty Ltd t/as Churchill Institute of
            Higher Education. 
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
