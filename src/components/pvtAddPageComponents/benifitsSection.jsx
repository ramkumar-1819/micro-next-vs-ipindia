import ListCard from "../globalComponents/listCard";

const BenifitsSection = ({ data }) => {
  return (
    <div className="flex flex-col gap-[24px] md:gap-[52px] md:m-auto md:max-w-[90%] lg:max-w-[80%] xl:max-w-[80%]">
      <p className="text-[24px] md:text-[32px] font-bold text-center">
        <span className="text-[#007AFF]">{data.coloredTitle}</span>
        {data.title}
      </p>
      <div className="max-md:flex max-md:flex-col gap-[24px] md:grid md:grid-cols-3 md:justify-center">
        {data.list.map((listItem, listIndex) => {
          return (
            <ListCard
              mainClassStyle="gap-[12px] items-center"
              key={listIndex}
              width={30}
              imageClass="md:w-[54px] md:h-[54px]"
              height={35}
              textStyle="max-md:text-[14px] md:text-[18px] font-normal text-[#606162]"
              text={listItem.text}
              image={listItem.image}
            />
          );
        })}
      </div>
    </div>
  );
};

export default BenifitsSection;
