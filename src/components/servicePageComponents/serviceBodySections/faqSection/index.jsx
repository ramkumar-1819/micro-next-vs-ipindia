import { useState } from "react";
import { Accordion } from "@uber9/web-react-components";
import parse from "html-react-parser";

const FaqSection = ({ content }) => {
  const [faqCount, setFaqCount] = useState(10);
  const [viewMore, setViewMore] = useState(false);
  const {
    faqs: { faqTitle, href, items },
  } = content;
  
  return (
    <div className="flex flex-col gap-[16px] last:mb-10">
      <p className={`text-[18px] font-semibold md:!text-[24px] scroll-m-20`} id={href}>
        {faqTitle ? faqTitle : `FAQ's on ${content.title}`}
      </p>
      {items?.slice(0, viewMore ? faqCount : 10)?.map((item, index) => {
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
      {items?.length > 10 && (
        <div className="flex justify-center">
          <button
            onClick={() => {
              setFaqCount(items.length), setViewMore(!viewMore);
            }}
            className="border-[1px] border-[#000] py-2 px-4 text-[14px] mb-4 rounded-md w-fit"
          >
            {!viewMore ? "View More" : "View Less"}
          </button>
        </div>
      )}
    </div>
  );
};

export default FaqSection;
