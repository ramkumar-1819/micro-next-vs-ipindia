import Image from "next/image";
import ListCard from "../globalComponents/listCard";

const WhyVakilSearch = ({ data }) => {
  return (
    <div className="md:flex md:gap-[70px] md:m-auto md:max-w-[90%] lg:max-w-[80%] xl:max-w-[80%]">
      <div className="flex flex-col gap-[20px]">
        <p className="text-[24px] md:text-[26px] font-bold">
          {data.title}{" "}
          <span className="text-[#007AFF]">{data.coloredTitle}</span>
        </p>
        <p className="max-md:text-[14px] md:text-[18px] font-normal text-[#606162]">
          {data.subTitle}
        </p>
        <div className="flex flex-col gap-[16px]">
          {data.list.map((item, index) => {
            return (
              <ListCard
                mainClassStyle="gap-[12px] items-start"
                key={index}
                width={48}
                height={52}
                textStyle="max-md:text-[14px] md:text-[18px] font-normal text-[#606162]"
                text={item.text}
                image={item.image}
              />
            );
          })}
        </div>
      </div>
      <Image
        className="md:w-[551px] md:h-[320px]"
        src={data.mapImage}
        width={343}
        height={199}
        alt="logo"
      />
    </div>
  );
};

export default WhyVakilSearch;
