import Parser from "@/components/globalComponents/parser";

const RecentUpdateSection = (props) => {
  const { title, items, href = "" } = props;

  return (
    <div className="scroll-m-20 pb-3" id={href}>
      <h2 className=" md:text-[22px] font-[600] pb-6 max-md:!text-[18px]">
        Recent Updates {title}
      </h2>
      {items?.map((recent, recentindex) => {
        return (
          <div key={"recent" + recentindex}>
            {recent.title && (
              <p className="text-[14px] font-[600] max-md:!text-[17px]">
                {recent.title}
              </p>
            )}
            {recent.text && (
              <Parser className="py-2 text-[16px]" content={recent.text} />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default RecentUpdateSection;
