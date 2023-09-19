import React, { Fragment, useEffect, useRef } from "react";
import Image from "next/image";
import Parser from "@/components/globalComponents/parser";
import ForeignCompany from "@/components/ForeignCompany";
import axios from "axios";
import ServiceBrochureForm from "@/components/ServicebrochureForm";

const ServiceContent = ({ content, setActiveItem, activeItem }) => {
  const { brochure_content } = content;

  useEffect(() => {
    const handleScroll = () => {
      content.sections.forEach((obj) => {
        obj.forEach((item) => {
          if (item.href) {
            const element = document.getElementById(item.href);
            if (element) {
              const rect = element.getBoundingClientRect();
              if (rect.top <= 70 && rect.bottom >= 0) {
                setActiveItem(`#${item.href}`);
              }
            }
          }
        });
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [content.sections]);

  return (
    <div>
      {content.sections.map((obj, index) => {
        return (
          <Fragment key={index}>
            {obj.map((item, i) => {
              return (
                <Fragment key={i}>
                  {item.title && (
                    <div
                      className="max-md:text-[18px] md:text-[24px] py-3 md:pt-7 md:pb-4 font-semibold scroll-m-16"
                      id={item.href}
                    >
                      <Parser content={item.title} />
                    </div>
                  )}
                  {item.heading && (
                    <div className="text-[17px] leading-loose font-[700]">
                      <Parser content={item.heading} />
                    </div>
                  )}
                  {item.text && (
                    <div className="text-[16px] pb-3 overflow-x-auto">
                      <Parser content={item.text} />
                    </div>
                  )}
                  {item.serviceImage?.map((image, index) => (
                    <p key={index} href={item.href}>
                      <Image
                        src={`${process.env.ASSETS_PATH}/${image.imgurl}`}
                        alt={image.alt}
                        height={300}
                        width={450}
                        className="max-md:w-full"
                      />
                    </p>
                  ))}
                  {item.items && (
                    <ul className="flex flex-col gap-3 pb-3 ">
                      {item.items.split("|").map((listitem, indexlist) => {
                        return (
                          <li
                            key={indexlist}
                            className="text-[16px] list-disc ml-4 "
                          >
                            <Parser content={listitem} />
                          </li>
                        );
                      })}
                    </ul>
                  )}
                  {item.datas && (
                    <div className="py-4 max-md:overflow-x-scroll text-center">
                      {item.datas.map((tableData, index) => {
                        return (
                          <table className="border-2 border-bg-[#dee2e6]">
                            <thead key={index}>
                              <tr>
                                {tableData.headings.map((heading, i) => {
                                  return (
                                    <th
                                      className="border-2 text-center text-[16px] font-semibold p-3"
                                      key={i}
                                    >
                                      <Parser content={heading} />
                                    </th>
                                  );
                                })}
                              </tr>
                            </thead>
                            <tbody className="text-[16px] p-2">
                              {tableData?.rows?.map((rows, rowsIndex) => {
                                return (
                                  <tr className="border-2" key={rowsIndex}>
                                    {Object.values(rows).map(
                                      (data, itemIndex) => {
                                        return (
                                          <td className="border-2 p-3">
                                            <Parser
                                              content={
                                                rows[`field${itemIndex + 1}`]
                                              }
                                            />
                                          </td>
                                        );
                                      }
                                    )}
                                  </tr>
                                );
                              })}
                            </tbody>
                          </table>
                        );
                      })}
                    </div>
                  )}
                  {item.accordion_brochure === "Download Guide" && (
                    <ServiceBrochureForm {...brochure_content} />
                  )}
                  {item.accordion === "Overseas Incorporation" && (
                    <div>
                      {content?.foreignCompany && (
                        <ForeignCompany data={content?.foreignCompany} />
                      )}
                    </div>
                  )}
                </Fragment>
              );
            })}
          </Fragment>
        );
      })}
    </div>
  );
};

export default ServiceContent;
