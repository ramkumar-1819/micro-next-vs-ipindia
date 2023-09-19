// TestimonialSlider.js
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";

const NewTestimonial = (props) => {
  console.log(props,"Damil");
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 5000,
  };

  return (
    <div className=" testimonialSlider mt-5 2xl:max-w-[710px] xl:max-w-[600px]  overflow-visible">
      <Slider {...settings}>
        {props.testimonials?.map((testimonial, index) => (
          <div
            key={index}
            className="slick-list md:h-[94px] p-[12px] border-b-2 border-blue-500 bg-white rounded-lg"
          >
            <div className="flex gap-2 items-center max-md:flex-col-reverse">
              <div className="flex gap-2 items-center md:border-r-[1px] md:pr-4 border-gray-200">
                <Image
                  src={testimonial.profile}
                  alt={testimonial.name}
                  width={40}
                  height={40}
                  className="rounded-full md:w-[43px] md:h-[43px]"
                />
                <div className="md:mr-[32px] max-md:text-[13px] flex flex-col gap-[2px] text-center">
                  <p>{testimonial.name}</p>
                  <p className="text-gray-500">{testimonial.position}</p>
                </div>
              </div>
              <p className="text-gray-800 text-base italic font-normal leading-6 max-md:border-b-[1px] max-md:pb-2 border-gray-100">
                {testimonial.review}
              </p>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default NewTestimonial;
