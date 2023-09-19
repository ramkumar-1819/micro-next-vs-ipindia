import Image from "next/image";
import { useState } from "react";

const SectionAccordion = ({ children, accordionTitle }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section
      className="flex flex-col overflow-hidden cursor-pointer"
      onClick={() => setIsOpen((prev) => !prev)}
    >
      <div className="flex justify-between items-center py-4 px-2 bg-[#f7f7f7] border-y-[1px] border-[#caced1]">
        <h4 className="font-bold">{accordionTitle}</h4>
        <Image
          src={`${process.env.ASSETS_PATH}/live-images/tms-revamp/tms-dowarrow.svg`}
          width={24}
          height={24}
          alt="arrow"
          className="min-w-[24px]"
        />
      </div>
      <div
        className={`transition-[grid-template-rows] duration-50 0 px-2 ease-in-out grid ${
          isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </section>
  );
};

export default SectionAccordion;
