"use-client";
import parse from "html-react-parser";
import Image from "next/image";
import HeroBannerSlider from "../../../serviceComponents/heroBannerSlider";
import { GoogleReview, PartnerList } from "@uber9/web-react-components";
import ServiceDashBoard from "../../ServiceDashboard";
import NewTestimonial from "@/components/pvtAddPageComponents/newtestimonial";
import axios from "axios";
import { readCookie } from "utils/serviceHelperFunction";
import { Analytics } from "utils/mixpanelAnalytics";
import { getBanner } from "@/utils/renderHelpers";
import BannerReviews from "@/components/BannerReview";
import { LeadForm } from "@uber9/micro-next-common-lib";

const RightFold = (props) => {
  const { content } = props;

  const succesTrack = (requestData, responseData) => {
    const { redirect } = responseData;
    const ga = readCookie("_ga");
    const id = ga;
    Analytics.identify(id);
    Analytics?.people.set(props);
    Analytics.track(content.mixpanelTrack, {
      ...requestData,
      ...responseData,
    });
    window.location.href = redirect;
  };

  const {
    formSection: {
      formTitle,
      submitCTA,
      hideCityField,
      hasLanguageField,
      bannerKey,
    },
  } = content;

  const formProps = {
    data: {
      serviceId: content?.serviceId,
      url: content.url,
      workflow: content?.workflow,
    },
    formData: {
      formTitle: formTitle,
      CTA: submitCTA || "Get Started",
      hideCityField: hideCityField,
      hasLanguageField: hasLanguageField,
      ...(bannerKey && { Banner: getBanner(bannerKey) }),
    },
    successCallback: succesTrack,
  };

  return (
    <div>
      <div className="max-md:mt-5 md:w-[28rem]">
        <LeadForm {...formProps} />
      </div>
      {content?.bannerInsight && (
        <p
          className={`md:hidden text-center py-8 max-md:pb-1 ${
            props.satelliteBanner ? `text-[24px]` : ``
          }`}
        >
          {parse(content.bannerInsight)}
        </p>
      )}
      {props.bannerInsight && (
        <h3 className="block text-[26px] leading-[36px] mx-auto  text-center p-5 font-[400] text-[#303030] md:!hidden">
          {parse(props.bannerInsight)}
        </h3>
      )}
      {props?.bannerReviewContent && (
        <div className="block md:!hidden">
          <BannerReviews data={props.bannerReviewContent} />
        </div>
      )}
      <div
        className={`inline-flex ${
          props.pvtAddBanner
            ? "md:pt-6"
            : props.MhideReview
            ? "hidden"
            : "md:hidden"
        } w-full max-md:my-6`}
      >
        <GoogleReview
          classNames={
            props?.showWhiteColor && {
              taglineClass: "!text-[#fafafa]",
              sectionClass: "!text-[#fafafa]",
            }
          }
        />
      </div>
      {props.showServiceDashBoard && (
        <div className="pt-5">
          <ServiceDashBoard {...props} />
        </div>
      )}
      {!props.hidePartnerList && (
        <div className="pt-5 max-md:mt-7">
          <PartnerList />
        </div>
      )}

      {/* {props?.b2bServicePage && (
        <div className="flex flex-col gap-8 md:py-6">
          <Image
            width={392}
            height={64}
            className="md:hidden"
            src="https://assets.vakilsearch.com/live-images/google-banner-review-new.svg"
            alt="google reviews"
          />
          <div className="flex justify-center">
            <PartnerList />
          </div>
        </div>
      )} */}
      {props?.bannerReviewContent && (
        <div className="md:hidden">
          <NewTestimonial testimonials={content.newTestimonials} />
        </div>
      )}
    </div>
  );
};

export default RightFold;
