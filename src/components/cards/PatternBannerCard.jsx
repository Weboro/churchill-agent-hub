import { Button } from "@/components";
import { FaArrowRight } from "react-icons/fa";

const PatternBannerCard = ({
  title,
  description,
  BtnALink,
  BtnAText,
  BtnBLink,
  BtnBText,
}) => {
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
      className="h-[45vh] flex items-center"
    >
      <div className="container mx-auto px-5">
        <div className="flex flex-col items-center justify-center gap-8 ">
          <h2 className="text-3xl md:text-5xl font-bold text-center text-[#eb9320]">
            {title}
          </h2>

          {description && (
            <p className="w-fit text-center mx-auto">{description}</p>
          )}
          {(BtnAText || BtnBText) && (
            <div className="flex flex-col md:flex-row gap-4 items-center justify-center">
              {BtnAText && (
                <a href={BtnALink}>
                  <Button
                    btnName={BtnAText}
                    icon={<FaArrowRight />}
                    styleA={"flex items-center gap-1"}
                  />
                </a>
              )}
              {BtnBText && (
                <a href={BtnBLink}>
                  <Button
                    btnName={BtnBText}
                    icon={<FaArrowRight />}
                    styleA={"flex items-center gap-1"}
                  />
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PatternBannerCard;
