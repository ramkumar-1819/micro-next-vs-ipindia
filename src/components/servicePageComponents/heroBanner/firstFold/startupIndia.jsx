import React from "react";
import TitleSection from "../../serviceBodySections/startupIndia/TitleSection";
import ReviewSection from "../../serviceBodySections/startupIndia/ReviewSection";
import StickyBar from "../../serviceBodySections/startupIndia/StickyBar";
import StepsInvolvedSection from "../../serviceBodySections/startupIndia/StepsInvolvedSection";
import OfficialPartnerSection from "../../serviceBodySections/startupIndia/OfficialPartnerSection";
import RecentUpdates from "../../serviceBodySections/startupIndia/RecentUpdates";
import FaqSection from "../../serviceBodySections/faqSection";
import StartupBody from "../../serviceBodySections/startupIndia/StartupBody";
import { LeadForm } from "@uber9/micro-next-common-lib";

const StartupFirstFold = (props) => {
  const { serviceId, url, workflow, content } = props;

  const formProps = {
    data: {
      serviceId: serviceId,
      url: url,
      workflow: workflow,
    },
    formData: {
      formTitle: content?.formTitle,
      CTA: content?.submitCta,
    },
  };

  return (
    <div
      id="banner-top"
      className="py-6 md:py-16 flex flex-col md:!flex-row gap-10 max-w-[1300px] mx-auto relative"
    >
      <div className="flex flex-col gap-10 px-5">
        <TitleSection {...content} />
        <div className="hidden md:!flex flex-col gap-10">
          <ReviewSection />
          <StickyBar {...content} />
          <StepsInvolvedSection {...content} />
          <StartupBody {...content} />
          <RecentUpdates {...content} />
          <FaqSection content={content} />
        </div>
      </div>
      <div className="min-w-fit md:min-w-[30rem]">
        <div className="relative md:!sticky md:top-20 flex flex-col items-center gap-5 max-w-[25rem] mx-auto px-5">
          <LeadForm {...formProps} />
          <OfficialPartnerSection />
        </div>
      </div>
      <div className="flex flex-col md:!hidden gap-5 px-5">
        <ReviewSection />
        <StepsInvolvedSection {...content} />
        <StartupBody {...content} />
        <RecentUpdates {...content} />
        <FaqSection content={content} />
      </div>
    </div>
  );
};

export default StartupFirstFold;
