import React, { Component } from 'react';
import Slider from 'react-slick';
import Link from 'next/link';
// eslint-disable-next-line no-unused-vars
const testimonalsArray = [
  {
    name: '“Legal is definitely made simple with Vakilsearch. The service and support they provided throughout the process of registering my company are more satisfying. They kept us away from all the complexities of company registration, by guiding us at every step. They’re very methodical in their disposition. It’s truly a new generation legal service team.”',
    author: 'Raman Singh1',
  },
  {
    name: '“Legal is definitely made simple with Vakilsearch. The service and support they provided throughout the process of registering my company are more satisfying. They kept us away from all the complexities of company registration, by guiding us at every step. They’re very methodical in their disposition. It’s truly a new generation legal service team.”',
    author: 'Raman Singh 2',
  },
  {
    name: '“Legal is definitely made simple with Vakilsearch. The service and support they provided throughout the process of registering my company are more satisfying. They kept us away from all the complexities of company registration, by guiding us at every step. They’re very methodical in their disposition. It’s truly a new generation legal service team.”',
    author: 'Raman Singh 3',
  },
  {
    name: '“Legal is definitely made simple with Vakilsearch. The service and support they provided throughout the process of registering my company are more satisfying. They kept us away from all the complexities of company registration, by guiding us at every step. They’re very methodical in their disposition. It’s truly a new generation legal service team.”',
    author: 'Raman Singh 4',
  },
];
export default class HorizontalScroll extends Component {
  constructor(props) {
    super(props);
    this.slider1 = null;
  }
  render() {
    const settings = {
      infinite: false,
      slidesToShow: 3,
      slidesToScroll: 1,
      arrows: true,
      adaptiveHeight: true,
      dots: false,
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
      // verticalSwiping: false,
      beforeChange: function () {
        // ("before change", currentSlide, nextSlide);
      },
      afterChange: function () {
        // ("after change", currentSlide);
      },
    };
    const serviceTypes = this.props.serviceTypes;
    return (
      <div className="mt-[-60px] md:[50px]">
        <Slider ref={(slider) => (this.slider1 = slider)} {...settings}>
          {serviceTypes.cols.map((obj, index) => {
            return (
              <div className="slider_inside" key={'slideindex' + index}>
                <p className={`text-center text-[14px] font-bold mb-[40px]`}>{obj}</p>
                <div
                  className={`w-[86%] ml-[7%] mt-[1%] mb-[2%] mr-[7%] md:w-[95%] md:my-0 md:mx-auto ${
                    index == 0 && 'bg-[#FFD200]'
                  }`}
                >
                  {serviceTypes.values[index].map((obj1, index1) => {
                    return (
                      <p
                        className="w-[88%] my-0 mx-auto"
                        key={'value_slider' + index1}
                      >
                        {obj1}
                      </p>
                    );
                  })}
                </div>
                <Link
                  href={`${process.env.ENVURLS}/${serviceTypes.links[index]}`}
                  as={`${process.env.ENVURLS}/${serviceTypes.links[index]}`}
                  className={`${
                    !serviceTypes.links[index] && 'hidevisibile'
                  } visibility`}
                >
                  Know More
                </Link>
              </div>
            );
          })}
        </Slider>
      </div>
    );
  }
}
