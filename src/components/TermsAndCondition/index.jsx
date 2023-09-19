import { useState, useRef } from "react";
import Tooltip from "./Tooltip";
import TermsModal from "../pvtAddPageComponents/pricingPackage/termsModal";
import Modal from "./Modal";

const TermsAndCondtions = ({ fontSmall, terms = "" }) => {
  const [show, setShow] = useState(false);
  const target = useRef(null);

  return (
    <span className="relative -translate-x-5 md:translate-x-0 z-[49]">
      <small
        className={`md:text-[14px] text-[#007aff] cursor-pointer text-center md:text-left ${
          fontSmall ? "text-center text-[12px] " : ""
        }`}
        ref={target}
        onClick={() => {
          setShow(!show);
          setTimeout(() => {
            setShow(false);
          }, 6000);
        }}
      >
        &nbsp;T&C*&nbsp;
      </small>
      {show && (
        <div className="hidden md:!block">
          <Tooltip tooltipContent={terms} />
        </div>
      )}
      {show && (
        <div className="md:!hidden">
          {Array.isArray(terms) ? (
            <TermsModal openModal={show} closeModal={setShow} content={terms} />
          ) : (
            <Modal modalContent={terms} onClose={() => setShow(false)} />
          )}
        </div>
      )}
    </span>
  );
};

export default TermsAndCondtions;
