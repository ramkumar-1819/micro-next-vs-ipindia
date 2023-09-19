import { useState } from "react";
import Image from "next/image";
// import UaeMobile from './UaeMobile';
const UaePriceToogle = (props) => {
  const styles={};
  const {
    priceSection: {countriesAccordion, uaeTitle, uaeImage },
  } = props;
  const [selectedIndex, setSelectedIndex] = useState(0);
  // Render the price toggles
  const renderDetails = () => {
    const selectedItem = countriesAccordion[selectedIndex];
    return (
      <>
        <div className="mt-[30px]">
          <p className="mb-7 font-bold text-[22px] leading-[25px]">
            <span>
              Without VISA -
            </span>
            <span className="text-[#007aff]">
              {selectedItem.withVisa.price}
            </span>
          </p>
          <p className="text-[18px] leading-[21px] mb-7">
            {selectedItem.withVisa.description}
          </p>
          <p className="mb-7 font-bold text-[22px] leading-[25px]">
            <span>With VISA - </span>
            <span className="text-[#007aff]">{selectedItem.withoutVisa.price}</span>
          </p>
          <p className="mb-7 text-[16px]">{selectedItem.withoutVisa.description}</p>
          <div className="flex">
            <ul className="grid grid-cols-2">
              {selectedItem.points.split("|").map((point) => (
                <li className="p-4 text-[16px] leading-[21px] flex gap-2 items-start">
                    <Image
                      src="https://assets.vakilsearch.com/live-images/business-setup-uae/bluetick.svg"
                      width={20}
                      height={20}
                      alt={"bluetick"}
                    />
                <p>{point}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </>
    );
  };

  return (
    <>
      {!props.ismobile && (
        <>
          <div className="w-[70%] my-[78px] mx-auto">
            <div className="flex">
              <div className="h-[535px] w-[23%]">
                <Image src={uaeImage} alt="UaeImage" width={228} height={210} />
                <p className="max-w-[370px] pb-[30px] font-bold text-[28px] leading-[38px] text-[#231f20]">
                  {uaeTitle}
                </p>
                {countriesAccordion.map((item, index) => (
                  <>
                    <div
                      key={item.title}
                      className={`flex gap-[10px] items-center mb-[50px] p-2 mr-5 hover:bg-[#f7f7f7] cursor-pointer ${
                        selectedIndex == index ? "bg-[#e6f2ff] rounded" : ""
                      }`}
                      onClick={() => setSelectedIndex(index)}
                    >
                      <span>
                        <Image width={56} height={52} {...item.img} />
                      </span>
                      <span>{item.title}</span>
                    </div>
                  </>
                ))}
              </div>
              <div className="w-[70%] mt-[52px] bg-[#e6f2ff] rounded-e relative pl-10">
                <div className="float-right mr-[68px] pl-[580px] absolute top-[-15px] z-0">
                  <Image
                    src="https://assets.vakilsearch.com/live-images/business-setup-uae/bestPrice.svg"
                    alt="bestPriceTag"
                    width={136}
                    height={122}
                  />
                </div>
                {renderDetails()}
              </div>
            </div>
          </div>
        </>
      )}
      {/*Mobile View */}
      {/* {props.ismobile && <UaeMobile {...props} />} */}
    </>
  );
};
export default UaePriceToogle;
