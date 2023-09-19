import Image from "next/image";

import CustomModal from "@/components/Modals/customModal";

const TermsModal = ({ openModal, closeModal, content }) => {
  return (
    <CustomModal
      show={openModal}
      onClose={() => {
        closeModal(false);
      }}
      outSideClickClose={false}
    >
      <div className="bg-white text-black flex flex-col gap-[20px] p-[12px] rounded-md relative mx-4">
        <Image
          src="https://assets.vakilsearch.com/close.svg"
          width={24}
          height={24}
          alt="close"
          className="top-[-30px] absolute right-0 cursor-pointer"
          onClick={() => {
            closeModal(false);
          }}
        />
        <p className="text-[20px] font-semibold">Terms and Conditions</p>
        <ul className="flex flex-col gap-[10px] list-disc max-w-[500px] pl-[35px]">
          {content.map((listItem, listIndex) => {
            return (
              <li className="text-[16px] font-medium" key={listIndex}>
                {listItem}
              </li>
            );
          })}
        </ul>
      </div>
    </CustomModal>
  );
};

export default TermsModal;
