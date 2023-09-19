import Image from "next/image";
import { useState } from "react";
import parse from "html-react-parser";

import Parser from "@/components/globalComponents/parser";
import TermsModal from "./termsModal";

const PricingCard = ({ data }) => {
  const [openTermsModal, setOpenTermsModal] = useState(false);
  const handleLoginRedirect = () => {
    window.location.href = `https://vakilsearch.com/onboard`;
  };

  return (
    <div
      className={`p-4 flex relative flex-col gap-[10px] max-md:w-[335px] md:w-[360px] z-[9]  ${
        data.fasttrack
          ? `mt-[25px] md:mt-0 bg-[#E5F0FF] border-[#007AFF]`
          : `border-[#F0F1F3] bg-white `
      } border-[1px] rounded-md shadow-[0px_0px_10px_rgba(104,104,104,0.08);]`}
    >
      <p className="text-[24px] font-semibold">{data.title}</p>
      <p className="text-[16px] font-normal">{data.subTitle}</p>
      <div className="flex gap-3">
        {data.cutOffPrice && (
          <div className="relative w-fit">
            <p className="text-[12px] font-medium">{data.cutOffPrice}</p>
            <div className="border-b-[1px] translate-y-[-40%] rotate-[-16deg] border-[#E83E3E] w-full absolute top-[9px]"></div>
          </div>
        )}
        {data.offer && (
          <div className="flex w-fit gap-[4px] bg-[#ECF8EB] rounded-lg px-[8px] py-[2px]">
            <Image
              src="https://assets.vakilsearch.com/offer+(1).svg"
              width={14}
              height={14}
              alt="offer"
            />
            <p className="text-[10px] text-[#3EB837]">{data.offer}</p>
          </div>
        )}
      </div>
      <div className="flex gap-4 items-end">
        <p
          className={`${
            data.cutOffPrice ? "" : "md:pt-6"
          } text-[32px] md:text-[46px] font-semibold`}
        >
          {data.price}
        </p>
        {data.govtFee && (
          <p className="text-[14px] md:text-[18px] font-normal pb-[9px] text-[#8F9397]">
            + Govt. Fee
          </p>
        )}
      </div>
      <div className="flex gap-[6px] border-t-[1px] border-b-[1px] py-2 border-[#CACED1] justify-center">
        <Image src={data.cashBackImage} width={28} height={32} alt="logos" />
        <div className="text-[13px] font-medium">
          {parse(data.cashBack)}
          {data.terms && (
            <span
              onClick={() => {
                setOpenTermsModal(true);
              }}
              className="font-bold underline cursor-pointer"
            >
              T&C.
            </span>
          )}
        </div>
      </div>
      <button
        onClick={handleLoginRedirect}
        className="bg-[#FCD209] text-[16px] font-medium py-[10px] w-full rounded-md"
      >
        {data.ctaTitle}
        {data.ctaSubTitle && (
          <div className="text-[12px] font-medium">
            <Parser content={data.ctaSubTitle} />
          </div>
        )}
      </button>
      <div className="flex flex-col gap-[12px]">
        <p className="text-[16px] md:text-[20px] font-semibold">
          {data.benifitsTitle}
        </p>
        {data.benifits.map((listItem, listIndex) => {
          return (
            <div className="flex gap-[8px]" key={listIndex}>
              <Image
                src="https://assets.vakilsearch.com/greentick.svg"
                width={20}
                height={20}
                alt="tick"
              />
              <div className="text-[14px] md:text-[16px] font-normal">
                <Parser content={listItem} />
              </div>
            </div>
          );
        })}
      </div>
      {data.note && (
        <p className=" md:absolute bottom-[20px] text-[12px] text-[#8F9397] font-light pt-4 px-4">
          {data.note}
        </p>
      )}
      {data.fasttrack && (
        <div className="flex gap-[4px] px-[9px] py-[3px] rounded-md top-[-31px] absolute bg-gradient-to-tr from-[#ECC654] via-[#FCEC97] to-[#DEBB57]">
          <Image
            src="https://assets.vakilsearch.com/Star+1.svg"
            width={15}
            height={15}
            alt="star-logo"
          />
          <p className="text-[#022B50]">Recommended</p>
        </div>
      )}
      {openTermsModal && (
        <TermsModal
          openModal={openTermsModal}
          closeModal={setOpenTermsModal}
          content={data.terms.givenTerms}
        />
      )}
    </div>
  );
};

export default PricingCard;
