import UaePriceToogle from "@/components/UaePriceToggle";
import TranslatorComp from "../../serviceBodySections/translator";
import LeftFold from "../leftFold";
import RightFold from "../rightFold";
import UaeMobile from "@/components/UaePriceToggle/UaeMobile";

const IncServicePage = (props) => {
  const { content } = props;
  return (
    <div>
      <div
        id="banner-top"
        className={`max-md:px-4 md:px-[120px] md:pb-20 pb-5 ${
          props.showBlueBanner
            ? "bg-[url('https://assets.vakilsearch.com/live-images/website_revamp/service_page_bg_new.jpg')] text-white"
            : props.showBlackBanner
            ? "bg-[url('https://assets.vakilsearch.com/live-images/website_revamp/business-banner.jpg')] text-white"
            : props.showBackgroundImage
            ? "bg-[url('https://assets.vakilsearch.com/live-images/business-setup-uae/bg.svg')] bg-no-repeat bg-cover"
            : props.showYellowBanner
            ? "bg-[url('https://assets.vakilsearch.com/live-images/website_revamp/yellowbanner.jpg')] bg-no-repeat bg-cover"
            : "bg-[#f0d643]"
        }`}
      >
        <div
          className={`mx-5 md:m-auto md:w-fit md:max-w-[80%]
        pt-[40px]`}
        >
          {props.languages && props.languages.length > 0 && (
            <TranslatorComp
              url={`${
                props.languages[0] == "hindi"
                  ? `/hi/` +
                    (props.page == "satellite"
                      ? props.serviceUrl + "/" + props.url
                      : props.url)
                  : "/" +
                    (props.page == "satellite"
                      ? props.serviceUrl + "/" + props.url
                      : props.url)
              }`}
              current_lng={props.languages[0] == "hindi" ? "Hindi" : "English"}
              target_lng={props.languages[0] == "hindi" ? "हिन्दी" : "English"}
              tmpage={props?.newvariant}
              page={props.page}
            />
          )}
          <div className="md:flex max-md:gap-4 md:gap-10">
            <LeftFold {...props} />
            <RightFold {...props} />
          </div>
          <div className="md:flex md:justify-center md:text-end">
            <p
              className={`p-2 mt-[14px] md:mt-[3rem] bg-[#ffec8f] rounded-2xl text-center w-fit text-[14px] max-md:mb-5 ${
                props.hideBannerBottom ? "hidden" : "block"
              }`}
            >
              {content?.bannerBottomContent}
            </p>
          </div>
        </div>
        <div className="max-md:hidden">
          {props?.priceSection && <UaePriceToogle {...content} />}
        </div>
        <div className="md:hidden">
          {props?.priceSection && <UaeMobile {...props} />}
        </div>
      </div>
    </div>
  );
};

export default IncServicePage;
