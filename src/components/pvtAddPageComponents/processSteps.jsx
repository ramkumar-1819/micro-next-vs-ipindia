import Image from "next/image";

const ProcessSteps = ({ data }) => {
  
  return (
    <div className="flex flex-col gap-[24px] md:gap-[20px] my-8 px-5 md:px-[30px]">
      <p className="text-[24px] md:text-[32px] font-bold flex md:gap-2 md:justify-center max-md:flex-col items-center">
        {data.title} <span className="text-[#007AFF]">{data.coloredTitle}</span>
      </p>
      <p className="text-[16px] mx-auto">{data?.subTitle}</p>
      <div className="flex max-md:flex-col gap-[44px] md:gap-[60px] md:justify-center">
        {data.list.map((listItem, listIndex) => {
          return (
            <div
              className={`flex gap-[12px] md:flex-col md:gap-[12px] items-center relative ${
                data?.showArrow ? "md:w-[200px]" : ""
              }`}
              key={listIndex}
            >
              <Image
                src={listItem.image}
                width={52}
                height={52}
                className="md:w-[80px] md:h-[80px] z-10"
                alt="logo"
              />
              <div className="flex flex-col md:text-[18px] gap-[8px] md:text-center ">
                <p className="text-[16px] font-medium">{listItem.text}</p>
                <p className="text-[14px] font-normal md:max-w-[360px] text-[#606162]">
                  {listItem.desc}
                </p>
              </div>
              {listIndex != 2 &&
                (!data.showArrow ? (
                  <>
                    <div
                      className={`border-[1px] md:top-[43px] md:left-[160px] md:border-r-[1px] md:w-full 
                max-md:border-b-[1px] absolute top-[58px] max-md:left-[24px] max-md:h-full border-dashed`}
                    ></div>
                    <Image
                      src="https://assets.vakilsearch.com/Polygon.svg"
                      width={12}
                      height={9}
                      className="absolute top-[35px] left-[314px] max-md:hidden"
                    />
                  </>
                ) : (
                  <div>
                    <div className="md:hidden">
                      <span className="absolute h-full border-l-2 border-dashed top-full left-6" />
                    </div>

                    <div className="absolute top-10 right-0 translate-x-full max-md:hidden">
                      <Image
                        src="https://assets.vakilsearch.com/Ngo/summary-icon-arrow.svg"
                        width={60}
                        height={20}
                      />
                    </div>
                  </div>
                ))}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProcessSteps;
