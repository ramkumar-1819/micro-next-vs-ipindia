import Image from "next/image";
import React from "react";
import TranslatorComp from "../../serviceBodySections/translator";
import DBSBanner from "@/components/pvtAddPageComponents/dbsBanner";
import ProcessSteps from "@/components/pvtAddPageComponents/processSteps";
import NewAdvantages from "@/components/NewAdvantage";
import NewProcessSection from "@/components/NewProceesorSection";
import LeftFold from "../leftFold";
import RightFold from "../rightFold";

const B2bServicePage = (props) => {
  const { content } = props;
  return (
    <div
      id="banner-top"
      className={`${
        props.showBlueBanner
          ? "bg-[url('https://assets.vakilsearch.com/live-images/website_revamp/service_page_bg_new.jpg')] text-white"
          : props.showpurplebg
          ? "bg-[url('https://assets.vakilsearch.com/live-images/website_revamp/incorporation_banner.jpg')] text-white"
          : props.showBlackBanner
          ? "bg-[url('https://assets.vakilsearch.com/live-images/website_revamp/business-banner.jpg')] text-white"
          : // : props.b2bServicePage
          // ? "bg-[url('https://assets.vakilsearch.com/live-images/b2b-final-bg.svg')] bg-no-repeat"
          props.showYellowBanner
          ? "bg-[url('https://assets.vakilsearch.com/live-images/website_revamp/yellowbanner.jpg')] bg-no-repeat bg-cover"
          : props.pvtAddBanner
          ? "bg-[#F5FAFF]"
          : ""
      }`}
    >
      <div
        className={`mx-6 md:m-auto md:w-fit ${
          props.pvtAddBanner ? "xl:max-w-[74%]" : ""
        } md:max-w-[80%]
        pt-16 md:pt-20 md:pb-12 pb-7`}
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

        <div className="md:flex md:justify-center">
          <p
            className={`px-2 py-1 mt-[14px] md:mt-[3rem] rounded-2xl text-center w-fit text-[14px] ${
              props?.showYellowcolor ? "bg-[#ffec8f]" : "bg-[#f0f1f3] max-md:mb-5"
            } ${props.hideBannerBottom ? "hidden" : "block"}`}
          >
            {content?.bannerBottomContent}
          </p>
        </div>

        <Image
          src={`https://assets.vakilsearch.com/live-images/${
            props?.showFlag
              ? "usa-inc-bg-image"
              : props?.showFlight
              ? "iec-banner-image"
              : "b2b-final-bg"
          }.svg`}
          width={464}
          height={780}
          className="max-lg:hidden absolute right-0 top-0 z-[-1]"
          alt="background"
        />
      </div>
      {props.showDbsBanner && <DBSBanner data={content.dbsBanner} />}
      <div>
        {props.showPropsSection && (
          <ProcessSteps
            className="max-md:mx-4 flex flex-col gap-[40px] md:gap-[70px] md:py-10 py-6"
            data={content.procesStepsSection}
          />
        )}
      </div>
      <div>
        {props.content.newProcessSection && (
          <NewProcessSection
            {...props.content.newProcessSection}
            // isMobile={ismobile}
          />
        )}
      </div>
      {props.content.newAdvantages && (
        <NewAdvantages {...props.content.newAdvantages} />
      )}
    </div>
  );
};

export default B2bServicePage;
