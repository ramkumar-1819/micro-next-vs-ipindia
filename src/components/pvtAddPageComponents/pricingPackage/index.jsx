import { useState } from "react";
import PricingCard from "./pricingCard";
import TermsModal from "./termsModal";
import Image from "next/image";

const PricingPackage = ({ pricing }) => {
  const [selectedTab, setSelectedTab] = useState(2);
  const [openModal, setOpenModal] = useState(false);

  return (
    <div
      id="pricing-package"
      className="flex flex-col gap-[16px] relative items-center bg-[#F8FBFF] py-4"
    >
      <p className="text-[24px] md:text-[34px] font-bold flex max-md:flex-col max-md:items-center md:gap-2">
        <span className="text-[#007AFF]">{pricing.coloredTitle}</span>
        {pricing.title}
      </p>
      <p className="text-[14px] md:text-[16px] font-normal text-[#606162]">
        {pricing.description}
      </p>
      <div className="md:hidden max-md:flex max-md:flex-col max-md:gap-[16px]">
        <div className="flex justify-between ">
          {pricing.mobileTabs.map((listItem, listIndex) => {
            return (
              <p
                onClick={() => {
                  setSelectedTab(listIndex);
                }}
                className={`text-[16px] px-4 py-1  ${
                  listIndex == selectedTab
                    ? `text-[#022B50] border-b-2 border-[#022B50]`
                    : `text-[#8095A7]`
                } font-medium`}
                key={listIndex}
              >
                {listItem}
              </p>
            );
          })}
        </div>

        {pricing.options.map((pricingItem, pricingIndex) => {
          return (
            <>
              {selectedTab == pricingIndex && (
                <PricingCard data={pricingItem} key={pricingIndex} />
              )}
            </>
          );
        })}
      </div>
      <div className="relative max-md:hidden md:flex gap-[60px] justify-center pt-8">
        <Image
          src="https://assets.vakilsearch.com/money.png"
          width={64}
          height={64}
          className="absolute max-md:hidden top-[-85px] md:w-[88px] md:h-[88px] md:left-0"
        />
        {pricing.options.map((pricingItem, pricingIndex) => {
          return <PricingCard data={pricingItem} key={pricingIndex} />;
        })}
      </div>
      <p className="text-[12px] max-md:py-[10px] md:py-[40px] font-medium text-[#8F9397]">
        <b>Note:</b>Government fees for incorporation are extra and it varies
        from state to state.&nbsp;
        <span
          onClick={() => {
            setOpenModal(true);
          }}
          className="text-[#007AFF] cursor-pointer"
        >
          T&C
        </span>
      </p>
      {openModal && (
        <TermsModal
          openModal={openModal}
          closeModal={setOpenModal}
          content={pricing.terms}
        />
      )}
      <Image
        src="https://assets.vakilsearch.com/packageRight.svg"
        width={200}
        height={626}
        className="absolute top-[70px] left-0 max-md:hidden"
      />
      <Image
        src="https://assets.vakilsearch.com/packageLeft.svg"
        width={131}
        height={431}
        className="absolute top-[80px] right-0 max-md:hidden"
      />
      <Image
        src="https://assets.vakilsearch.com/money.png"
        width={64}
        height={64}
        className="absolute md:hidden top-[15px] max-md:left-[10px] md:w-[88px] md:h-[88px] md:left-[200px]"
      />
    </div>
  );
};

export default PricingPackage;
