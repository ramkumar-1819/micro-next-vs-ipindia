import Image from "next/image";

import { getAltText } from "@/utils/helperFunctions";

const OfficialPartnerSection = () => {
  const logos = ["vakilsearch-logo.svg", "startup-india-logo.png"];

  return (
    <section className="border-[1px] border-[#F0F1F3] rounded w-full">
      <div className="flex justify-around p-4 relative">
        {logos?.map((logo, index) => (
          <Image
            key={index}
            src={`${process.env.ASSETS_PATH}/live-images/startup-india-scheme/${logo}`}
            width={120}
            height={60}
            alt={getAltText(logo)}
          />
        ))}
        <span className="absolute top-1/2 h-2/3 -translate-y-1/2 w-[2px] bg-[#F0F1F3]" />
      </div>
      <p className="bg-[#F7F7F7] text-[#606162] font-medium border-t-[1px] border-[#F0F1F3] p-4 text-center rounded">
        OFFICIAL PARTNER
      </p>
    </section>
  );
};

export default OfficialPartnerSection;
