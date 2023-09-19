import B2bServicePage from "./firstFold/b2bServicePage";
import GstFirstFold from "./firstFold/gstFirstFold";
import SatellitePage from "./firstFold/satellitePage";
import IncServicePage from "./firstFold/incService";

const HeroBanner = (props) => {
  return (
    <>
      {props.b2bServicePage && <B2bServicePage {...props} />}
      {props.satelliteBanner && <SatellitePage {...props} />}
      {props.gstFirstFold && <GstFirstFold {...props} />}
      {props.incServicePage && <IncServicePage {...props} />}
    </>
  );
};

export default HeroBanner;
