import Link from "next/link";
import Slider from "react-slick";
import { Card } from "./Card";

export const SliderComponent = (props) => {
  const { cols, values, links } = props;

  const CustomPrevArrow = (props) => {
    const { className, onClick } = props;
    return (
      <div
        className={`block bg-[#ffd000] w-7 h-7 rounded-full absolute top-1/2 -translate-y-1/2 left-2 md:-left-2 text-center text-xl cursor-pointer z-10 shadow ${
          className.includes("slick-disabled") ? "text-black/25 opacity-75" : ""
        }`}
        onClick={onClick}
      >
        {"<"}
      </div>
    );
  };

  const CustomNextArrow = (props) => {
    const { className, onClick } = props;
    return (
      <div
        className={`block bg-[#ffd000] w-7 h-7 rounded-full absolute top-1/2 -translate-y-1/2 right-2 md:-right-2 text-center text-xl cursor-pointer z-10 shadow ${
          className.includes("slick-disabled") ? "text-black/25 opacity-75" : ""
        }`}
        onClick={onClick}
      >
        {">"}
      </div>
    );
  };

  const settings = {
    infinite: false,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
    adaptiveHeight: true,
    dots: false,
    nextArrow: <CustomNextArrow />,
    prevArrow: <CustomPrevArrow />,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: false,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: false,
        },
      },
    ],
  };

  return (
    <Slider {...settings}>
      {cols.map((title, index) => (
        <div className="!flex flex-col gap-4 items-center">
          <p className="w-fit text-[14px] whitespace-nowrap font-bold">
            {title}
          </p>
          <Card cardData={values[index]} isYellowCard={index === 0} />
          {links[index] && (
            <Link
              href={links[index]}
              className="text-[#3863e7] underline underline-offset-1"
            >
              Know More
            </Link>
          )}
        </div>
      ))}
    </Slider>
  );
};
