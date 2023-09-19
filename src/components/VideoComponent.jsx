import React from "react";
import CustomModal from "./Modals/customModal";

const VideoComp = (props) => {
  const { show, onHide } = props;
  const { autoplay = "", videoHeight = 450 } = props;
  return (
    <CustomModal show={show} onClose={onHide} outSideClickClose={onHide}>
      <iframe
        title="Vakilsearch"
        width="100%"
        height={videoHeight}
        allow={autoplay}
        // onLoad={() => alert('loaded...')}
        src={props.videourl}
      ></iframe>
    </CustomModal>
  );
};
export default VideoComp;
