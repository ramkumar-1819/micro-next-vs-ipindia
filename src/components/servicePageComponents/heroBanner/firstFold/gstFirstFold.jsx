import HeroBannerList from "@/components/serviceComponents/heroBannerList";
import LeftFold from "../leftFold";
import RightFold from "../rightFold";

const GstFirstFold = (props) => {
  return (
    <div className=" max-md:px-4 text-white bg-gst-Banner md:px-[120px]">
      <div className="pt-[100px] lg:px-[120px] md:flex">
        <LeftFold {...props} />
        <RightFold {...props} />
      </div>
      <HeroBannerList
        title={props.docLists.title}
        lists={props.docLists.list}
      />
    </div>
  );
};

export default GstFirstFold;
