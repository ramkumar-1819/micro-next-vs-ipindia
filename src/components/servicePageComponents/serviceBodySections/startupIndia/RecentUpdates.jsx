import Image from "next/image";

const RecentUpdates = (props) => {
  const {
    recentUpdates: { title, newspaper, points },
  } = props;

  return (
    <section className="p-3 md:p-5 bg-[#F7F7F7] flex flex-col md:!flex-row gap-6 items-start mb-10">
      <Image
        src={`${process.env.ASSETS_PATH}/startup${newspaper}`}
        width={200}
        height={200}
        alt="recent update"
        className="hidden md:!block md:mt-10"
      />
      <div className="flex flex-col gap-2">
        <div className="flex gap-2 justify-between items-center">
          <Image
            src={`${process.env.ASSETS_PATH}/startup${newspaper}`}
            width={90}
            height={90}
            alt="recent update"
            className="md:hidden"
          />
          <p className="text-[20px] md:text-[24px] text-[#231f20] font-bold">{title}</p>
        </div>
        {points?.map((point, index) => (
          <p key={index} className="text-[14px] text-[#606162] pb-2 last:pb-0">
            {point}
          </p>
        ))}
      </div>
    </section>
  );
};

export default RecentUpdates;
