import { useState, useEffect } from "react";
import parser from "html-react-parser";
import Image from "next/image";
import ForeignCompanyForm from "./ForeignCompanyForm";
import CustomModal from "./Modals/customModal";

const ForeignCompany = (props) => {
  const { data, isMobile } = props;
  const [showModal, setShowModal] = useState(false);
  const [showComponent, setShowComponent] = useState(false);

  useEffect(() => {
    setTimeout(() => setShowComponent(showModal), 250);
  }, [showModal]);

  return (
    <div
      className="p-4 rounded border-[1px] border-[#caced1] md:max-w-[50rem] scroll-m-20"
      id={data?.href}
    >
      {/* <div className="block md:!grid md:grid-rows-2 lg:grid-rows-1 lg:grid-cols-2 gap-10"> */}
      <div className="block md:!flex gap-4">
        <div className="flex flex-col justify-between gap-4">
          <h2 className="text-[18px] md:!text-[24px] font-semibold mb-5 md:mb-1">
            {data.title}
          </h2>
          <p className="text-[15px]">{data.subTitle}</p>
          <div className="text-[15px]">{parser(data.description)}</div>
          <button
            className="font-bold !bg-[#f2d000] w-full py-2 rounded flex justify-center text-[15px]"
            id="vs-btn-primary"
            onClick={() => setShowModal(true)}
          >
            {data.button.text}
          </button>
        </div>
        <div className="hidden lg:!flex relative w-full items-start">
          <Image
            src={"https://assets.vakilsearch.com/foreign-company-min.png"}
            alt={data?.image?.alt}
            height={900}
            width={400}
          />
        </div>
      </div>
      {showComponent && (
        <CustomModal
          className="foreign-company-form-modal"
          show={showModal}
          onClose={() => setShowModal(false)}
          outSideClickClose={() => setShowModal(false)}
        >
          <ForeignCompanyForm
            content={data.form}
            {...props}
            setShowModal={setShowModal}
          />
        </CustomModal>
      )}
    </div>
  );
};

export default ForeignCompany;
