import Image from "next/image";

import { getAltText } from "@/utils/helperFunctions";

const ReviewSection = () => {
  const imageData = [
    { logo: "/mouthshut-logo.svg", rating: "4.4/5" },
    { logo: "/trustpilot-logo.svg", rating: "4.1/5" },
    { logo: "/google-logo.svg", rating: "4.2/5" },
  ];

  return (
    <section className="flex gap-10 justify-center md:!justify-evenly flex-wrap md:max-w-[80%]">
      {imageData.map((link, index) => (
        <div className="flex flex-col gap-2 items-center" key={index}>
          <div className="flex gap-2 items-center">
            <Image
              src={`${process.env.ASSETS_PATH}/rating%20(1).png`}
              height={30}
              width={75}
              alt="Rating stars"
            />
            <p className="text-xs text-[#606162] font-semibold">
              {link.rating}
            </p>
          </div>
          <div className="max-h-[25px] relative">
            <Image
              src={`${process.env.ASSETS_PATH}/live-images/startup-india-scheme${link.logo}`}
              height={80}
              width={80}
              // layout="fill"
              alt={getAltText(link.logo)}
              className="w-full"
            />
          </div>
        </div>
      ))}
    </section>
  );
};

export default ReviewSection;
