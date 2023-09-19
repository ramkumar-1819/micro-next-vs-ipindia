import React, { useState } from "react";
import Image from "next/image";

const HeroBannerSlider = (props) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = props.bannerReviewContent.length;
  const customColor = props.customColor;
  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  return (
    <div className="relative w-full overflow pb-8">
      <div className="flex transition-transform">
        {props.bannerReviewContent.map((items, index) => (
          <div
            key={index}
            className={` md:flex gap-2 p-6 ${
              customColor ? customColor : "bg-[#ffed97]"
            } rounded-xl ${index === currentSlide ? "" : "hidden"}`}
          >
            <Image
              src={items.img}
              width={60}
              height={60}
              alt="img"
              className="max-md:absolute top-[-32px] left-[135px]"
            />
            <div className="flex flex-col gap-4 max-md:pt-6">
              <p className="text-[16px] font-normal">{items.review}</p>
              <span className="text-[16px] font-semibold">
                <span> {items.name}</span> - <span>{items.designation}</span>
              </span>
            </div>
          </div>
        ))}
      </div>
      <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-full flex  gap-2 justify-center">
        {props.bannerReviewContent.map((_, index) => (
          <button
            key={index}
            className={`${
              index === currentSlide ? "bg-black" : "bg-gray-400"
            } h-2 w-2 rounded-full mx-1 focus:outline-none`}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroBannerSlider;
