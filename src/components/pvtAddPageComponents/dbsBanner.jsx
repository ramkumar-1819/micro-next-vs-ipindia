import Image from "next/image";
import parse from "html-react-parser";
import { useState } from "react";

import useIsMobile from "@/utils/findIsMobile";
import TermsModal from "./pricingPackage/termsModal";

const DBSBanner = ({ data }) => {
  const isMobile = useIsMobile();
  const [openModal, setOpenModal] = useState(false);
  return (
    <div className="md:flex md:justify-center bg-gradient-to-r from-[#ECF8EB] to-[#D4EBD2] z-1">
      <div
        className="flex max-md:gap-[10px] md:gap-[30px] md:text-[20px] md:font-bold text-[12px] font-normal p-4 
       max-md:bg-[#ECF8EB] items-center"
      >
        <Image
          src={data.dbsBannerImage}
          width={99}
          height={38}
          className="md:w-[224px] md:h-[70px]"
          alt="dbsBanner"
        />
        <div className="max-md:hidden border-[1px] border-r-[1px] border-[#B6B6B6] h-[90%]"></div>
        <div className="md:max-w-[440px] text-center">
          {parse(data.desc)}&nbsp;
          <span
            className="text-[#007AFF] cursor-pointer"
            onClick={() => {
              setOpenModal(true);
            }}
          >
            T&C.
          </span>
        </div>
      </div>
      <div className="flex max-md:gap-[35px] md:gap-[9px] max-md:bg-[#D4EBD2] py-[5px] md:pl-[85px] justify-center md:flex-col md:bg-dbs-banner">
        <p className="text-[12px] font-normal md:text-[16px] md:font-medium">
          {data.partner}
        </p>
        <div className="flex gap-[8px]">
          <Image
            src={data.bankImages}
            width={341}
            height={243}
            alt="banks"
            className="max-md:w-[173px] max-md:h-[12px]"
          />
        </div>
      </div>
      {openModal && (
        <TermsModal
          openModal={openModal}
          closeModal={setOpenModal}
          content={data.terms}
        />
      )}
    </div>
  );
};

export default DBSBanner;
