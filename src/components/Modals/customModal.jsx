import { useEffect, useRef, useState } from "react";

const CustomModal = (props) => {
  const { children, show, onClose, outSideClickClose } = props;
  const ref = useRef(null);

  useEffect(() => {
    if (outSideClickClose) {
      const handleClickOutside = (event) => {
        if (ref.current && !ref.current.contains(event.target)) {
          onClose && onClose();
        }
      };

      document.addEventListener("mousedown", handleClickOutside);

      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
  }, []);

  if (!show) return null;

  return (
    <div
      className={`fixed  inset-0 overflow-y-auto bg-black bg-opacity-30 z-50`}
    >
      <div className="flex items-center justify-center m-4 h-full">
        <div ref={ref} className={props.className}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default CustomModal;
