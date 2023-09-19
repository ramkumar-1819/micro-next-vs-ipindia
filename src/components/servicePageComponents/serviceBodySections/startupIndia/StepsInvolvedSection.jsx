import Image from "next/image";

import SectionTitleBar from "./SectionTitleBar";
import Parser from "@/components/globalComponents/parser";
import { getAltText } from "@/utils/helperFunctions";

const StepsInvolvedSection = (props) => {
  const {
    steps: { title, description, stepList },
  } = props;

  return (
    <section>
      <SectionTitleBar title={title} description={description} />
      <div className="flex flex-col gap-8 md:!flex-row justify-between">
        {stepList?.map((step, index) => (
          <div
            key={`step-${index}`}
            className="flex md:flex-col items-center gap-3 relative w-full"
          >
            {index < stepList.length - 1 && (
              <span className="absolute h-full md:!h-fit md:w-full border-l-2 border-b-0 md:border-l-0 md:border-b-2 border-dashed top-1/2 md:!top-[20%] left-[2.15rem] md:left-1/2" />
            )}
            <Image
              src={`${process.env.ASSETS_PATH}/Ngo/${step?.img}`}
              width={70}
              height={70}
              alt={getAltText(step?.img)}
              className="z-[1]"
            />
            <Parser content={step?.mobdesc} className={"block md:!hidden"} />
            <Parser content={step?.desc} className={"hidden md:!block"} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default StepsInvolvedSection;
