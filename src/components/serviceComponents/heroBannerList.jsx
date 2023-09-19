import parse from "html-react-parser";
import { useState } from "react";

const HeroBannerList = ({ title, lists }) => {
  const [modalShow, setModalShow] = useState(true);
  return (
    <div className="flex flex-col gap-3 py-8 lg:px-[120px]">
      <p className="text-[#f1c40f] text-[16px] font-normal md:text-[14px]">{title}</p>
      <div className="flex max-md:flex-col gap-4">
        {lists.map((itemList, listIndex) => {
          return (
            <div  key={listIndex} className="flex flex-col gap-2 md:pr-[60px] md:border-r-2 md:border-[#ff0]">
              <p className="text-[16px] font-bold">
                {parse(itemList.header)}
              </p>
              <ol className="pl-8 list-disc flex flex-col gap-2">
                {itemList.items.map((listItem, i) => {
                  return (
                    <li key={i} className="text-[16px] font-normal">
                      {parse(listItem)}
                    </li>
                  );
                })}
                {itemList.directorProof && (
                  <li className="text-[#f1c40f]">Director's Proof</li>
                )}
              </ol>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default HeroBannerList;
