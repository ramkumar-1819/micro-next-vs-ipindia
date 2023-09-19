import Image from "next/image";
import { useEffect, useState } from "react";
const UaeMobile = (props) => {
  const { countriesAccordion } = props.content.priceSection;
  //states
  const [selectedIndex, setSelectedIndex] = useState([0]);
  //handleAccordian -> opens and close the view button
  const handleAccordian = (selected) => {
    const prevSelected = [...selectedIndex];
    const index = prevSelected.indexOf(selected);
    if (index === -1) {
      prevSelected.push(selected);
    } else {
      prevSelected.splice(index, 1);
    }
    setSelectedIndex(prevSelected);
  };
  useEffect(() => {}, [selectedIndex]);

  return (
    <>
      <div className="p-4">
        <div className=" w-[70%] mx-auto">
          <Image
            src={props.content.priceSection.uaeImage}
            alt="UaeImage"
            width={228}
            height={210}
          />
        </div>
        <div className="flex justify-between">
          <div className="text-[28px] font-bold leading-[34px] text-[#231f20] mb-6 max-w-[255px]">
            {props.content.priceSection.uaeTitle}
          </div>
          <div className="self-center">
            <Image
              src="https://assets.vakilsearch.com/live-images/business-setup-uae/bestPrice.svg"
              alt="bestPriceTag"
              width={60}
              height={60}
            />
          </div>
        </div>
        {countriesAccordion.map((item, index) => (
          <>
            <div className="bg-[#e6f2ff] rounded py-4 px-2 pb-2 mb-6">
              <div className="flex gap-2 pb-4 items-end">
                <span>
                  <Image {...item.img} width={56} height={52} />
                </span>
                <span className="font-[700] text-[24px] leading-[28px] text-[#231f20] pb-[14px] text-center">{item.title}</span>
              </div>
              <div className="bg-[#ffffff] rounded text-center">
                <div className="font-[700] text-[20px] leading-[23px] text-[#606162] pt-5 pb-3">
                  WITHOUT VISA
                </div>
                <div className="font-[700] text-[24px] leading-[28px] text-[#231f20] pb-[14px]">
                  {" "}
                  {item.withVisa.price}
                </div>
                <div className="text-[16px] leading-[23px] text-center text-[#606162] p-2">
                  {item.withVisa.description}
                </div>
                <hr className="border-[2px] border-[#f0f1f3] my-0 mx-4 mt-6" />
                <div className="font-[700] text-[20px] leading-[23px] text-[#606162] pt-5 pb-3">WITH VISA</div>
                <div className="font-[700] text-[24px] leading-[28px] text-[#231f20] pb-[14px]">{item.withoutVisa.price}</div>
                <hr className="border-[1px] border-[#e6f2ff]" />
                <div className="pb-[10px]">
                  <div className="flex justify-center"
                    onClick={() => handleAccordian(index)}
                  >
                    <span className="pr-2 font-[500px] text-[14px] leading-[23px] text-[#007aff]">
                      View benefits
                    </span>
                    <span className="my-auto">
                      {selectedIndex.includes(index) ? (
                        <Image
                          src="https://assets.vakilsearch.com/live-images/business-setup-uae/upArrow.svg"
                          alt="uparrow"
                          width={16}
                          height={10}
                        />
                      ) : (
                        <Image
                          src="https://assets.vakilsearch.com/live-images/business-setup-uae/downArrow.svg"
                          alt="downarrow"
                          width={16}
                          height={10}
                        />
                      )}
                    </span>
                  </div>
                  {selectedIndex.includes(index) && (
                    <>
                      <div>
                        <hr className="border-[1px] border-[#e6f2ff]" />
                        <div className="text-[16px] leading-[23px] text-center text-[#606162] p-2">
                          {countriesAccordion[index].withoutVisa.description}
                          <div className="text-[16px] leading-[23px]text-[#606162] mb-5 p-2">
                            {selectedIndex.includes(index)
                              ? () => {
                                  handleAccordian(0);
                                }
                              : ""}
                          </div>
                        </div>
                      </div>
                      <div className="text-[16px] leading-[19px] text-left">
                        <ul>
                          {countriesAccordion[index].points
                            .split("|")
                            .map((point) => (
                              <li className="p-4 flex">
                                <span className="mr-4 min-w-[20px]">
                                  <Image
                                    src="https://assets.vakilsearch.com/live-images/business-setup-uae/bluetick.svg"
                                    width={20}
                                    height={20}
                                    alt={"bluetick"}
                                  />
                                </span>
                                <span>{point}</span>
                              </li>
                            ))}
                        </ul>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </>
        ))}
      </div>
    </>
  );
};
export default UaeMobile;
