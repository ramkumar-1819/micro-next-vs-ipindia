import Image from "next/image";

import SectionTitleBar from "./SectionTitleBar";
import Parser from "@/components/globalComponents/parser";
import { getAltText } from "@/utils/helperFunctions";
import SectionAccordion from "./SectionAccordion";

const StartupBody = (props) => {
  const { sections } = props;

  const getRenderedComponent = (section) => {
    const { renderType, features, tick = "", blueTick = "" } = section;

    switch (renderType) {
      case "simpleList":
        return (
          <ul className="text-[#606162]">
            {features?.map((feature, index) => (
              <li
                key={`list-${index}`}
                className="pb-3 last:pb-0 list-disc ml-4"
              >
                <Parser content={feature} />
              </li>
            ))}
          </ul>
        );
      case "tickList":
        return (
          <div className="flex flex-col gap-4">
            {features?.map((feature, index) => (
              <div key={`feature-${index}`} className="flex gap-3 items-start">
                <Image
                  src={`${process.env.ASSETS_PATH}/startup${tick}`}
                  width={20}
                  height={20}
                  alt={getAltText(tick)}
                  className="mt-2"
                />
                <p className="text-[18px] text-[#606162] leading-7">
                  <span className="text-[#231f20] font-semibold">
                    {feature?.title}
                  </span>
                  {feature?.description}
                </p>
              </div>
            ))}
          </div>
        );
      case "specialList":
        return (
          <div className="bg-[#E6F2FF] p-5 rounded">
            {features?.map((feature, index) => (
              <div
                key={index}
                className="flex gap-3 items-start pb-5 last:pb-0"
              >
                <Image
                  src={`${process.env.ASSETS_PATH}/startup${blueTick}`}
                  width={20}
                  height={20}
                  alt={"blue-tick"}
                  className="mt-[2px]"
                />
                <div className="text-[#606162]">
                  <p className="font-bold">{feature?.title}</p>
                  <Parser content={feature?.description} />
                </div>
              </div>
            ))}
          </div>
        );
      case "imageList":
        return (
          <div className="grid md:grid-cols-2 gap-8 my-8">
            {features?.map((feature, index) => (
              <div key={index} className="flex flex-col gap-4">
                <Image
                  src={`${process.env.ASSETS_PATH}/startup${feature?.img}`}
                  width={60}
                  height={60}
                  alt="sentence explainers"
                />
                <p className="text-[#231f20] text-[18px] font-medium">
                  {feature?.title}
                </p>
                <p className="text-[#606162]">{feature?.description}</p>
              </div>
            ))}
          </div>
        );
      case "journal":
        return (
          <div className="flex flex-col gap-5">
            {features?.map((feature, index) => (
              <div key={index} className="flex flex-col gap-2">
                <p className="text-[18px] text-[#231f20] font-semibold">
                  {feature?.title}
                </p>
                <p className="text-[#606162]">{feature?.description}</p>
              </div>
            ))}
          </div>
        );
      case "blocks":
        return (
          <div className="bg-[#F7F7F7] border-[1px] border-[#CACED1] rounded">
            {features?.map((feature, index) => (
              <div
                key={index}
                className="flex flex-col gap-1 text-[#606162] p-3 border-b-[1px] border-[#caced1] last:border-none"
              >
                <p className="font-semibold text-base md:text-[18px] text-[#231f20]">
                  {feature?.title}
                </p>
                <Parser content={feature?.description} />
              </div>
            ))}
          </div>
        );
      default:
        return <></>;
    }
  };

  return (
    <>
      <div className="hidden md:!flex flex-col gap-10">
        {sections?.map((section, index) => {
          let { title, description, sectionId } = section;
          return (
            <section key={`section-${index}`}>
              <SectionTitleBar
                title={title}
                description={description}
                id={sectionId || null}
              />
              {getRenderedComponent(section)}
              {section?.note && (
                <p className="text-[18px] text-[#606162] my-4">
                  {section?.note}
                </p>
              )}
            </section>
          );
        })}
      </div>
      <div className="md:hidden">
        {sections?.map((section, index) => {
          let { accordionTitle, description } = section;
          return (
            <SectionAccordion
              key={`section-${index}`}
              accordionTitle={accordionTitle}
            >
              <div className="min-h-0">
                <SectionTitleBar description={description} />
                {getRenderedComponent(section)}
                {section?.note && (
                  <p className="text-[18px] text-[#606162] my-4">
                    {section?.note}
                  </p>
                )}
              </div>
            </SectionAccordion>
          );
        })}
      </div>
    </>
  );
};

export default StartupBody;
