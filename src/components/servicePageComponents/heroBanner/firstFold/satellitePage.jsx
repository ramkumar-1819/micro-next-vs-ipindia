import LeftFold from "../leftFold";
import RightFold from "../rightFold";

const SatellitePage = (props) => {
  const { content } = props;
  console.log(props?.bannerBottomContent)
  return (
    <div className={`md:bg-no-repeat md:bg-cover md:px-[120px] ${
      props.showBlueBanner
          ? "bg-[url('https://assets.vakilsearch.com/live-images/website_revamp/service_page_bg_new.jpg')] text-white"
          :"bg-satellite-banner"
    }`}>
      <div className="md:flex md:gap-6 max-md:px-4 pt-[100px]">
        <LeftFold {...props} />
        <RightFold {...props} />
      </div>
      {props.bannerBottomContent && (
        <div className=" md:flex md:justify-center">
          <p className="my-3 p-2 bg-[#ffec8f] rounded-2xl text-center w-fit">
            {props?.bannerBottomContent}
          </p>
        </div>
      )}
    </div>
  );
};

export default SatellitePage;
