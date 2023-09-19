import Parser from "../globalComponents/parser";

const Tooltip = (props) => {
  const { tooltipContent } = props;

  return (
    <div className="absolute bg-white rounded -bottom-2 left-1/2 -translate-x-1/2 translate-y-full z-[99] shadow-[0_4px_65px_hsla(0,0%,50%,0.25)] w-[340px]">
      <Parser
        className="text-[13px] text-black p-3 relative before:content-[''] before:absolute before:-top-2 before:left-1/2 before:-translate-x-1/2 before:h-0 before:w-0 before:border-x-8 before:border-x-transparent before:border-b-[16px] before:border-white"
        content={tooltipContent}
      />
    </div>
  );
};

export default Tooltip;
