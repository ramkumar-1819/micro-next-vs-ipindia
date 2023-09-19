import Link from "next/link";
import { useEffect, useState } from "react";
import StateWiseData from "@/data/stateWiseList.json";
import { useRouter } from "next/router";
import Image from "next/image";

const StateWiseList = (props) => {
  const [utm, setUtm] = useState("");
  const [origin, setOrigin] = useState("");
  const [currentPath, setCurrentPath] = useState();
  const [path, setPath] = useState(
    // router.asPath.replace(/^\/|\/$/g, '').split('/')[0],
    "sole-proprietorship-registration"
  );
  const url = [
    "online-trademark-registration",
    "sole-proprietorship-registration-india",
    "online-gst-registration",
    "online-food-license-fssai-registration",
    "llp-registration-india",
    "online-company-registration",
    "copyright-registration",
    "gst-return-filing",
    "partnership-firm-registration",
  ];

  useEffect(() => {
    setUtm(window.location.href.split("?")[1]);
    setOrigin(window.origin);
    const current_path = window.location.pathname.replace(/^\/|\/$/g, "");
    setCurrentPath(current_path);
    setPath(
      current_path.split("/")[0] === "business-setup"
        ? current_path.split("/")[1]
        : current_path.split("/")[0]
    );
    document.body.scrollTop = document.documentElement.scrollTop = 0;
  }, [props.url]);

  const filteredUrls =
    StateWiseData && StateWiseData.filter((a) => a.baseUrl === path);

  const { stateWiseList } = props;
  const [loadMore, setLoadMore] = useState(false);

  if (!filteredUrls[0]) return null;

  const data = stateWiseList ?? { ...filteredUrls[0] };
  console.log({ StateWiseData, data, filteredUrls });
  return (
    <div className="flex flex-col md:gap-10 max-md:gap-3 md:px-[120px] max-md:px-4">
      <p className="font-bold text-center">{data?.baseHeading}</p>
      <div className="max-md:flex max-md:flex-col gap-[20px] max-md:py-[30px] md:grid md:grid-cols-3">
        {data?.stateList
          // .filter((x) => x.url != currentPath)
          .slice(0, loadMore ? data.stateList.length : 12)
          .map((item, index) => (
            <div className="flex gap-1" key={index}>
              <Image
                src={`${process.env.ASSETS_PATH}/live-images/blue-arrow.svg`}
                width={12}
                height={12}
                alt="arrow"
              />
              <Link
                className="!text-[#007bff] flex items-center text-[14px]"
                href={item.url}
              >
                {item.name}
              </Link>
            </div>
          ))}
      </div>
      <button
        onClick={() => {
          setLoadMore(!loadMore);
        }}
        className="px-9 text-[#007bff] flex items-center text-[14px] gap-3 border-[#007bff] py-2 mb-5 border-[1px] rounded-md w-fit self-center"
      >
        {loadMore ? "Show less" : "Show more"}
        {loadMore ? (
          <Image
            src={`${process.env.ASSETS_PATH}/upload.png`}
            width={10}
            height={10}
            alt="arrow"
          />
        ) : (
          <Image
            src={`${process.env.ASSETS_PATH}/arrow-down-sign-to-navigate.png`}
            width={10}
            height={10}
            alt="arrow"
          />
        )}
      </button>
    </div>
  );
};

export default StateWiseList;
