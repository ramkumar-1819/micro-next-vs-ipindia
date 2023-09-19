import Image from "next/image";
import parse from "html-react-parser";

const PartnerBenifit = ({ content }) => {
  const { partnerBenefitsContent } = content;
  return (
    <div className="flex flex-col gap-3">
      <p className="text-[18px] md:text-[28px] font-semibold">
        {partnerBenefitsContent.title}
      </p>
      <p>{parse(partnerBenefitsContent?.subTitle)}</p>
      <div className="max-md:flex flex-col gap-10 md:grid md:grid-cols-2 md:gap-14">
        {partnerBenefitsContent.content?.map((item, index) => {
          return (
            <div className="flex flex-col gap-4 mx-4" key={index}>
              <Image
                src={decodeURIComponent(item.image)}
                width={item.width}
                height={item.height}
                alt="data"
              />
              <p className="text-[#007aff]  bg-[#eaf4ff] py-[6px] px-[10px] text-[14px] rounded-md">
                {item.tag}
              </p>
              <ul>
                {item.contents.map((list, listIndex) => {
                  return (
                    <li
                      className="flex items-start gap-[10px] text-[16px] md:text-[18px]"
                      key={listIndex}
                    >
                      <Image
                        src="https://assets.vakilsearch.com/live-images/blue-white-tick-b2b.svg"
                        width={16}
                        className="mt-1"
                        height={16}
                        alt="tick"
                      />
                      <span>{parse(list)}</span>
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PartnerBenifit;
