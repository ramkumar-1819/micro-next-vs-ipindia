import Parser from "../globalComponents/parser";

const Modal = (props) => {
  const { modalContent, onClose } = props;

  return (
    <div
      className={`fixed inset-0 overflow-y-auto bg-black bg-opacity-30 z-50`}
    >
      <div className="flex items-center justify-center mx-auto h-full w-full">
        <div className="bg-white text-black flex flex-col rounded-md relative mx-4 p-5 text-[14px]">
          <Parser content={modalContent} />
          <button
            onClick={onClose}
            className="w-full bg-[#ffd000] mt-4 text-[#231f20] text-[18px] text-center font-bold py-3 rounded-md"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
