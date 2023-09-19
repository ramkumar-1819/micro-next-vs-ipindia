import { useEffect, useState } from "react";
import Image from "next/image";

const StickyBar = (props) => {
  const { stickyBar } = props;
  const handleScroll = (index) => {
    // height -> current height of the active tab
    const height = document.getElementById(`stickyBar-${index + 1}`).offsetTop;

    window.scrollTo({
      top: height - 100,
      behavior: "smooth",
    });
  };

  //states
  const [scrollY, setScrollY] = useState(0);
  const [activeTab, setActiveTab] = useState("");

  //handle sticky Active color
  const handleSticky = () => {
    setScrollY(window.pageYOffset);
    if (scrollY >= 690 && scrollY < 1170) {
      setActiveTab(0);
    } else if (scrollY >= 1170 && scrollY < 1770) {
      setActiveTab(1);
    } else if (scrollY >= 1770 && scrollY <= 3100) {
      setActiveTab(2);
    } else {
      setActiveTab("");
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleSticky);
    handleSticky();
    return () => {
      window.removeEventListener("scroll", handleSticky);
    };
  });

  return (
    <div className="hidden md:!flex justify-between py-4 sticky top-16 bg-white z-10">
      {stickyBar.map((item, index) => (
        <div
          className={`flex gap-3 items-center border-[1px] rounded-full px-5 py-3 cursor-pointer transition-colors ${
            index === activeTab
              ? "bg-[#e6f2ff] border-[1px] border-[#007aff]"
              : ""
          }`}
          onClick={() => handleScroll(index)}
        >
          <Image
            src={`${process.env.ASSETS_PATH}/startup/${item.img}`}
            height={20}
            width={20}
            alt="img"
          />
          <p>{item.title}</p>
        </div>
      ))}
    </div>
  );
};

export default StickyBar;
