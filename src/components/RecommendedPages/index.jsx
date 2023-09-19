import React, { useEffect, useState } from "react";
import Link from "next/link";
// import styles from '../stateWiseList/styles.module.scss';
import parse from "html-react-parser";
import Image from "next/image";

const RecommendedPages = (props) => {
  const [origin, setOrigin] = useState("");
  const [currentPath, setCurrentPath] = useState("");
  const [show, setShow] = useState(false);
  const [containerHeight, setContainerHeight] = useState("auto");
  const [contentHeight, setContentHeight] = useState(0);

  useEffect(() => {
    setOrigin(window.origin);
    const current_path = window.location.pathname.replace(/^\/|\/$/g, "");
    setCurrentPath(current_path);
  }, []);

  // useEffect(() => {
  //   const container = document.querySelector(`mt-0`);
  //   const height = container.scrollHeight;

  //   setContentHeight(height);

  //   if (height > 400) {
  //     setContainerHeight(show ? `${height}px` : '400px');
  //   }
  // }, [show]);

  const handleShowMore = () => {
    setShow(!show);
    setContainerHeight(show ? "400px" : `${contentHeight}px`);
  };

  return (
    <section className="flex flex-col md:gap-10 max-md:gap-3 md:px-[120px] max-md:px-4 mb-[25px]">
      <div>
        <h3 className="font-bold text-center">
          <b>{props?.data?.title}</b>
        </h3>
      </div>
      <div className="grid grid-cols-3 gap-10">
        {props.data?.links &&
          props.data?.links
            .filter((x) => x.url !== currentPath)
            .map((data, index) => {
              const path = `${process.env.ENVURLS}${
                props.serviceUrl ? `/${props.serviceUrl}` : ""
              }/${data.url}`;
              const servicePath = `${process.env.ENVURLS}/${data.url}`;
              return (
                <div className="flex gap-1" key={index}>
                  <Image
                    src={`${process.env.ASSETS_PATH}/live-images/blue-arrow.svg`}
                    width={12}
                    height={12}
                    alt="arrow"
                  />
                  <Link
                    className="!text-[#007bff] flex items-center text-[14px]"
                    href={props.data.servicePath ? servicePath : path}
                  >
                    <i></i>
                    &nbsp;{parse(data.name)}
                  </Link>
                </div>
              );
            })}
      </div>
      {contentHeight > 400 && (
        <div>
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
      )}
    </section>
  );
};

export default RecommendedPages;
