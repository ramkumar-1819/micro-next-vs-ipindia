import Image from "next/image";
import React from "react";
import Slider from "react-slick";

const BannerReviews = (props) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true,
    autoplay: true,
    arrows: false,
  };
  return (
    <>
      <div className="md:!hidden shadow-[0_4px_10px_4px_rgba(0,0,0,0.08)">
        <Slider {...settings}>
          {props.data.map((items, index) => {
            return (
              <div
                key={index}
                className="relative overflow-visible rounded-[12px] p-5 mt-10 bg-[#ffed97] text-center"
              >
                <Image
                  src={items.img}
                  alt="client logo"
                  height={60}
                  width={60}
                  className="border-[4px] border-[#fdd106] rounded-full h-fit w-fit absolute -top-10 left-1/2 -translate-x-1/2"
                />
                <div className="mt-10">
                  <div key={index}>
                    <div className="flex flex-col gap-5">
                      <p className="text-[14px] text-[#303030] p-0">
                        {items.review}
                      </p>
                      <span className="text-[14px]">
                        <span>
                          <b>{items.name}</b>
                        </span>
                        {" - "}
                        <span>{items.designation}</span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </Slider>
      </div>

      <div className="bg-[#ffed97] rounded-[12px] shadow-[0_4px_10px_4px_rgba(0,0,0,0.08) hidden md:!block">
        <Slider {...settings}>
          {props.data.map((items, index) => {
            return (
              <div key={index} className="!flex p-4">
                <Image
                  src={items.img}
                  height={60}
                  width={60}
                  alt="profile"
                  className="border-[4px] border-[#fdd106] mr-[10px] rounded-full h-fit"
                />
                <div className="pl-5 min-h-[90px] flex flex-col gap-3">
                  <p className="text-[16px] text-[#303030] p-0">
                    {items.review}
                  </p>
                  <span className="b-0">
                    <span>
                      <b>{items.name}</b>
                    </span>
                    {" - "}
                    <span>{items.designation}</span>
                  </span>
                </div>
              </div>
            );
          })}
        </Slider>
      </div>
    </>
  );
};
export default BannerReviews;
