import parse from "html-react-parser";
import { useState } from "react";

import { Accordion } from "@uber9/web-react-components";

const PVTFAQSection = ({ data }) => {
  const [faqCount, setFaqCount] = useState(10);
  const [viewMore, setViewMore] = useState(false);
  return (
    <div className="flex flex-col gap-[24px] md:gap-[52px] md:m-auto md:max-w-[90%] lg:max-w-[80%] xl:max-w-[80%]">
      <p className="text-[24px] md:text-[32px] font-bold text-center">
        {data.title}
        <span className="text-[#007AFF]">{data.coloredTitle}</span>
      </p>
      <div className="flex flex-col gap-3">
        {data.faqs.slice(0, viewMore ? faqCount : 10).map((item, index) => {
          return (
            <Accordion
              label={parse(item.question)}
              key={index}
              content={parse(item.answer)}
              type="secondary"
              name="FAQSection"
            />
          );
        })}
      </div>
      {data.faqs.length > 10 && (
        <div className="flex justify-center">
          <button
            onClick={() => {
              setFaqCount(data.faqs.length), setViewMore(!viewMore);
            }}
            className="border-2 border-[#000] p-1 text-[14px] mb-4 rounded-md w-fit"
          >
            {!viewMore ? "View More" : "View Less"}
          </button>
        </div>
      )}
    </div>
  );
};

export default PVTFAQSection;
