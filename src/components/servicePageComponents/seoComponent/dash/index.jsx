import Image from "next/image";

import data from "../../data/dashbanner.json";

const DashBanner = ({ content }) => {
  const { menus } = content;
  const { bannerdata } = data;

  const sectionId = menus?.find((item) => item.title === "Dash")?.href;

  return (
    <>
      <div
        className="max-w-[343px] my-4 mx-auto  md:max-w-[683px] md:my-[25px] bg-[#ffffff] scroll-m-20"
        id={sectionId && sectionId.slice(1)}
      >
        <div className="flex max-md:flex-col gap-4 text-left items-center p-4 mb-[5px] bg-[rgba(2,43,80,0.1)] rounded-[6px]">
          <div className="">
            <Image
              src={bannerdata?.dashimage}
              width={63}
              height={24}
              alt={`dashImage`}
            />
          </div>
          <div className="text-[16px] font-[700] md:text-[20px] leading-6">
            {bannerdata?.title}
          </div>
        </div>
        <div className="py-2 px-[10px] bg-[#ffffff] rounded">
          <ul className="grid max-md:!grid-cols-1 grid-cols-2">
            {bannerdata?.features.map((element, index) => (
              <>
                <li className=" p-[9px] flex md:p-6">
                  <span className="pl-[10px] pr-[11px]">
                    {" "}
                    <Image src={bannerdata?.tickimage} width={18} height={14} />
                  </span>
                  <span className="font-[500] text-[16px] leading-[19px] text-[#231f20]">
                    {element}
                  </span>
                </li>
              </>
            ))}
          </ul>
          <div className="mt-[5px] p-2 text-[16px] leading-[19px] py-2 px-[10px] bg-[#f7f7f7] rounded mx-auto">
            <div className="font-[400] text-[16px] leading-[19px] text-[#231f20]">
              {bannerdata?.footer}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashBanner;
