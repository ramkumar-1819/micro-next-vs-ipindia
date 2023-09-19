import CustomModal from "@/components/Modals/customModal";
import Image from "next/image";

const OpenModal = ({ show, setClose, video, link }) => {
  return (
    <div>
      <CustomModal
        show={show}
        onClose={() => {
          setClose(false);
        }}
        outSideClickClose={true}
        className={` ${
          video ? `md:my-0 md:mx-auto md:max-w-[900px] w-full` : ""
        }`}
      >
        <div className={`relative ${video ? "h-96 md:h-[450px]" : ``}  `}>
          <button
            className="absolute top-1 right-2"
            onClick={() => setClose(false)}
          >
            <b className={`text-xl ${video ? "text-white" : "text-black"} `}>
              x
            </b>
          </button>
          {video ? (
            <iframe
              className="w-full h-full"
              src={link}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            ></iframe>
          ) : (
            <div>
              <Image src={link} width={540} height={764} alt="certificate" />
            </div>
          )}
        </div>
      </CustomModal>
    </div>
  );
};

export default OpenModal;
