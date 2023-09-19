import Image from "next/image";
import React, { useEffect, useState } from "react";

const TestimonialComponent = () => {
  const [active, setActive] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % 5);
    }, 3000);

    return () => clearInterval(interval);
  }, [active]);

  const cardData = [
    {
      content:
        "“Thank you Vakilsearch for making our dreams come true. Incorporating our company in the US was a dream and the execution of the same was done very well. Your team made every step of the incorporation process simple and easy. I am a very happy customer and will be recommending your name to my business friends. Will surely be availing your services soon.”",
      author: "Akash Ravi",
    },
    {
      content:
        "“Absolutely worth every penny I spent. Vakilsearch has delivered maximum quality with absolute professionalism. I got all my paperwork done on-time and I will definitely recommend Vakilsearch’s incorporation services to anyone. Very happy by the service provided. All the best team!.”",
      author: "Swathi Rajkumar",
    },
    {
      content:
        "“I never thought getting my company incorporated in the US would be so easy. Every single phase of the registration went well. My documents were collected personally by the Vakilsearch team. All correspondences and responses were prompt. Will definitely use their services again in the future. Great job, team.”",
      author: "Sainath Iyer",
    },
    {
      content:
        "“Thank you for providing stellar services for US incorporation. I am thoroughly impressed by the services and the way it was offered by your firm. Extremely courteous staff who were responsive at all times. Most importantly the services were offered at an affordable cost without any compromise on quality. Please continue your good work Vakilsearch.”",
      author: "Aarti Menon",
    },
    {
      content:
        "“Extremely pleased by the services offered at Vakilsearch. Would like to thank you for all the hard work your team put into Incorporating my company in Delaware within the stipulated time promised. I will definitely come back for more. Strongly recommend Vakilsearch.”",
      author: "Arjun Gopalan",
    },
  ];

  return (
    <div className="bg-blue-600 md:p-0 py-10 px-3 relative">
        <Image className="md:mx-[600px] md:pt-[30px] md:absolute ml-[190px]"
        src={"https://assets.vakilsearch.com/live-images/website_revamp/testimonial-quotes.png"}
        width={140}
        height={80}
        alt="commaimage"/>
      <div className="max-w-[1100px] flex flex-col gap-10 md:!flex-row md:gap-16 justify-center items-center mx-0 md:mx-auto">
          <h1 className="text-white text-3xl font-[400] md:text-4xl">
            What our customers are saying
          </h1>
          <div className="relative min-h-[20rem] text-[12px] md:text-[14px] md:min-h-[24rem] w-full md:!w-[54%] my-10 mx-0">
            {cardData?.map((item, index) => (
              <Card
                data={item}
                index={index}
                activeIndex={(active + index) % 5}
                setActive={setActive}
              />
            ))}
          </div>
      </div>
    </div>
  );
};

export default TestimonialComponent;

const Card = ({ data, index, activeIndex, setActive }) => {
  const stylesArray = [
    "below opacity-60 scale-90 translate-y-[calc(-50%+6rem)]",
    "active opacity-100 scale-100 z-10 translate-y-[-50%]",
    "above opacity-60 scale-90 translate-y-[calc(-50%-6rem)]",
    "inactive opacity-0 scale-90 z-0 translate-y-[-50%]",
    "inactive opacity-0 scale-90 z-0 translate-y-[-50%]",
  ];
  return (
    <div
      className={`${stylesArray[activeIndex]} rounded p-4 text-center flex flex-col gap-3 mx-auto w-full transition-all absolute top-1/2 duration-[350ms] ease-linear bg-white cursor-pointer`}
      onClick={() => setActive(index == 0 || index == 1 ? +!index : index)}
    >
      <p>{data?.content}</p>
      <h2 className="font-bold text-sm">
        {data?.author}
      </h2>
    </div>
  );
};
