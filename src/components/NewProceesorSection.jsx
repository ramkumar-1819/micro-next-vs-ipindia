import Image from 'next/image';

const NewProcessSection = (props) => {
  const { title, lists, isMobile } = props;
  return (
    <section className="p-4 md:max-w-[1200px] md:my-0 md:mx-auto ">
      <h2 className="text-[#000] text-center text-[24px] font-bold mb-8 md:text-[32px] leading-[42px] md:mb-[56px]">{title}</h2>
      <ul className="md:flex relative md:justify-evenly">
        {lists.map((list, index) => {
          return (
            
            <li  className="flex gap-6 md:flex-col md:gap-[22px] md:justify-between md:items-center justify-start" key={list}>
              <div className="w-[40px] h-[40px] flex items-center justify-center rounded-[28px] bg-[#f7f7f7] z-[1]">
                {list.listImage ? (
                  
                  <div>
                    <Image
                      src={list.listImage}
                      width={40}
                      height={40}
                      alt="list"
                    />
                  </div>
                ) : (
                  index + 1
                  )}
              </div>
              <div className="md:m-0 mb-6">
                <p className="text-[#231f20] text-[16px] leading-[24px] font-bold mb-1 md:text-[18px] md:mb-5">{list.listTitle}</p>
                <p className="text-[#000] text-[14px] leading-[20px] m-0 md:text-center">{list.listDescription}</p>
              </div>
              </li>
          );
        })}
        <span className="absolute w-[70%] h-[90%] md:h-0 border-l-2 md:border-l-0 md:border-b-2 border-[#caced1] border-dotted top-0 md:!top-[15%] left-[1.15rem] md:left-1/2 md:-translate-x-[52%]" />
      </ul>
    </section>
  );
};

export default NewProcessSection;
