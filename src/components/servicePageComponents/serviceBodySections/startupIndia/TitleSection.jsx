import Image from "next/image";

const TitleSection = (props) => {
  const {
    formSection: { title, list },
  } = props;

  return (
    <section className="flex flex-col gap-5 md:gap-10">
      <h1 className="w-fit text-[32px] md:text-[42px] font-bold md:border-b-[3px] border-[#FCD000]">
        {title}
      </h1>
      <div className="text-[18px] text-[#606162] leading-relaxed md:leading-loose">
        {list.map((item) => (
          <div className="flex gap-2 items-start mb-2 last:mb-0">
            <Image
              src="https://assets.vakilsearch.com/live-images/blue-white-tick-b2b.svg"
              width={16}
              height={16}
              alt="blue tick"
              className="mt-[6px] md:mt-[10px]"
            />
            <p>{item}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TitleSection;
