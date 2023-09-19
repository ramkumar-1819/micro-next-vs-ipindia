import Image from 'next/image';

const NewAdvantages = (props) => {
  const { lists, title, isMobile } = props;

  return (
    <section className="w-full p-4 md:p-0 md:max-w-[1200px] md:my-0 md:mx-auto">
      <h2 className="text-[#000] text-center text-[24px] font-bold leading-[34px] mb-8 md:text-[32px] md:leading-[40px] md:mb-10">{title}</h2>
      <div className="md:grid md:grid-cols-3 md:py-0 md:mb-8">
        {lists.map((list) => {
          const { image, listTitle, description } = list;
          return (
            <div className="mb-6 md:max-w-[375px] max-md:mb-8" key={listTitle}>
              <Image
                src={image}
                width={isMobile ? 32 : 50}
                height={isMobile ? 32 : 50}
                alt="advantage"
              />
              <h6 className="text-[#171717] text-[20px] font-[500] my-4 mx-0 md:text-[24px] md:leading-[34px] md:mx-0 md:mt-4">{listTitle}</h6>
              <p className="text-[#606162] text-[16px] leading-[24px] m-0 md:text-[20px] md:leading-[28px]">{description}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default NewAdvantages;
