const SectionTitleBar = (props) => {
  const { title, description, id } = props;
  return (
    <div id={id ? `stickyBar-${id}` : null}>
      <p className="hidden md:!block font-bold text-[22px] text-[#231f20] mb-3">
        {title}
      </p>
      <div className="mt-6 mb-4 md:!mt-0 md:mb-8 text-[#606162] md:text-[18px]">
        {description}
      </div>
    </div>
  );
};

export default SectionTitleBar;
