import ListCard from "../globalComponents/listCard";

const DocumentRequired = ({ data }) => {
  return (
    <div className="flex flex-col gap-[24px] md:gap-[52px] md:m-auto md:max-w-[90%] lg:max-w-[80%] xl:max-w-[80%]">
      <p className="text-[24px] md:text-[32px] font-bold text-center">
        <span className="text-[#007AFF]">{data.coloredTitle}</span>
        {data.title}
      </p>
      <div className="flex max-md:flex-col gap-[24px] md:gap-[32px] md:justify-center">
        {data.proofs.map((listItem, listIndex) => {
          return (
            <div key={listIndex} className="flex flex-col gap-[18px] md:gap-[24px]">
              <p className="text-[18px] font-semibold">{listItem.title}</p>
              <div className="flex flex-col gap-[16px] md:gap-[20px]">
                {listItem.list.map((item, index) => {
                  return (
                    <ListCard
                      mainClassStyle="gap-[8px] items-start"
                      key={index}
                      width={24}
                      height={24}
                      textStyle="max-md:text-[16px] md:text-[18px] font-normal text-[#606162]"
                      text={item.text}
                      image={item.image}
                    />
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DocumentRequired;
