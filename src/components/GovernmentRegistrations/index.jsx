"use client";
import { Card } from "./Card";
import { SliderComponent } from "./Slider";

const GovernmentRegistrations = (props) => {
  const { title, rows } = props;

  return (
    <div className="max-w-[1400px] p-6 mx-auto">
      <h3 className="w-fit mx-auto mb-10 text-[34px] text-center">{title}</h3>
      <div className="flex md:gap-20 mt-10">
        <Card cardData={rows} isStaticCard={true} />
        <div className="w-full min-w-0">
          <SliderComponent {...props} />
        </div>
      </div>
    </div>
  );
};

export default GovernmentRegistrations;
