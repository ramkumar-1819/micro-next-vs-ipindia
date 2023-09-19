import Image from "next/image";

const PartnerBenifits = ({ data }) => {
  return (
    <div className="flex flex-col gap-[16px] md:m-auto md:max-w-[90%] lg:max-w-[80%] xl:max-w-[80%]">
      <p className="text-[24px] md:text-[32px] font-bold text-center">
        {data.title}
        <span className="text-[#007AFF]">{data.coloredTitle}</span>
        {data.subTitle}
      </p>
      <p className="text-[14px] font-normal text-center text-[#606162]">
        {data.desc}
      </p>
      <div className="max-md:flex max-md:gap-3 overflow-auto md:pt-[30px] md:grid md:grid-cols-3 md:gap-[30px]">
        {data.list.map((item, index) => {
          return (
            <div
              className="p-4 border-[1px] border-[#E9EDF4] 
              flex flex-col gap-[8px] 
              rounded-md max-md:min-w-[320px]"
              key={index}
            >
              <Image
                src={item.image}
                width={item.width}
                height={item.height}
                alt="partner"
              />
              <p className="text-[16px] text-[#007AFF] font-bold">
                {item.title}
              </p>

              {item.dataList.map((listItem, listIndex) => {
                return (
                  <div className="flex gap-1 items-start" key={listIndex}>
                    <Image
                      src="https://assets.vakilsearch.com/live-images/blue-white-tick-b2b.svg"
                      width={16}
                      height={16}
                      alt="tick"
                    />
                    <p className="text-[14px] font-normal">{listItem}</p>
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PartnerBenifits;
