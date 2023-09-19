import { useState } from "react";

const LeftMenuSection = ({ content, setActiveItem, activeItem }) => {
  return (
    <div className="h-[80vh] overflow-auto md:sticky md:top-16 py-5">
      <ul className="flex flex-col gap-[2px]">
        {content.menus
          .filter((menu) => !menu.disable)
          .map((item, index) => {
            return (
              <li
                key={index}
                className={`bg-[#f7f7f7] py-3 font-semibold text-[15px] cursor-pointer px-2 mx-2 rounded-[4px] transition duration-200 ease-in-out ${
                  item.href == activeItem
                    ? "bg-[#ffff] border-l-[5px] border-[#ffd000] shadow-[0_0_7px_0_#a39393] text-[16px]"
                    : ""
                }`}
              >
                {/* <a href={`${item.href}`}>{item.title}</a> */}
                <p
                  onClick={() => {
                    setActiveItem(item.href);
                    let element = document.querySelector(item.href);
                    element?.scrollIntoView({
                      behaviour: "smooth",
                      block: "start",
                      inline: "nearest",
                    });
                    console.log("Itemm clicked", item.href, activeItem);
                  }}
                >
                  {item?.title}
                  {item.new && (
                    <span className="bg-[#fdd209] text-[12px] ml-[5px] py-[2px] px-[3px] rounded-[4px]">
                      <b>New</b>
                    </span>
                  )}
                </p>
              </li>
            );
          })}
      </ul>
    </div>
  );
};

export default LeftMenuSection;
