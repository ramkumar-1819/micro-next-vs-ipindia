import HorizontalScroll from "@/components/HorizontalCarousel";

const Govt_Registrations = (props) => {
  const serviceTypes = props.serviceTypes;
  return (
    <section className="p-[15px] bg-[#f6f6f6]">
      <div className="md:[5px]">
        <h3 className="">Types of Government Registrations</h3>
        <div className="mt-2 md:mt-0">
          <div className="md:ml-0 lg:col-span-3 md:col-span-4 col-span-5">
            <div className="shadow-[0_0_7px_1px_#c0b6b6] md:mt-[111px] md:shadow-none w-[94%] bg-white">
              {serviceTypes.rows.map((obj, index) => {
                return (
                  <p key={'rows_govt_' + index} className="pt-[10px] pr-[5px] pb-[50px] pl-4 border-b-[0.2px] border-[#e9ebec] m-0 text-[14px] font-[500] h-[50px] break-words md:h-auto">
                    {obj}
                  </p>
                );
              })}
            </div>
          </div>
          <div className="p-[0.75rem] lg:pr-[0.75rem] col-span-9 md:col-span-8">
            <HorizontalScroll serviceTypes={serviceTypes} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Govt_Registrations;
