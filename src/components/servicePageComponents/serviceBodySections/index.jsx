"use-client";

import LeftMenuSection from "@/components/serviceComponents/leftMenuSection";
import FaqSection from "./faqSection";
import ServiceContent from "./servicePageContent";
import StickyUrlSection from "./stickyUrlSection";
import ServiceBrochureForm from "./brochureSection/ServiceBrochureForm";
import PartnerBenefitsNew from "@/components/PartnerBenefitsNew";
import Govt_Registrations from "@/components/Govt_Registrations";
import {
  ClientLogos,
  GoogleReview,
  ImageList,
} from "@uber9/web-react-components";
import { useEffect, useState } from "react";
import Parser from "@/components/globalComponents/parser";
import DashBanner from "../seoComponent/dash";
import StickyFooter from "@/components/StickyFooter";
import { getBanner } from "@/utils/renderHelpers";
import TestimonialComponent from "@/components/Testimonial";
import CompanySearch from "@/components/CompanySearchSection";
import { v4 as uuidV4 } from "uuid";
import { LeadForm, ChatBot } from "@uber9/micro-next-common-lib";
import GovernmentRegistrations from "@/components/GovernmentRegistrations";
import RecentUpdateSection from "./RecentUpdateSection";

const ServiceBody = (props) => {
  const { ismobile } = props;
  const { content, stickyLinksContent } = props;

  const {
    secondaryFormSection: { formTitle, submitCTA, hasLanguageField, bannerKey },
  } = content?.formSection;

  const formProps = {
    data: {
      serviceId: content?.serviceId,
      url: content.url,
      workflow: content?.workflow,
    },
    formData: {
      formTitle: formTitle,
      CTA: submitCTA || "Get Started",
      hideWhatsappToggle: true,
      hasLanguageField: hasLanguageField,
      ...(bannerKey && { Banner: getBanner(bannerKey) }),
    },
  };

  const chatBotProps = {
    type: "default",
    botId: process.env.GENERIC_CHAT_BOT_ID,
    appId: process.env.KOMMUNICATE_APP_ID,
    canonicalUrl: props?.canonicalUrl,
    uuid: uuidV4(),
    url: props?.url,
    kommunicateServiceBotName: props?.kommunicateServiceBotName,
    workflow: props?.content?.workflow,
    serviceId: props?.content?.serviceId,
  };

  const clientLogoImages = [
    {
      src: `${process.env.ASSETS_PATH}/llp/startup.png`,
      width: 100,
      height: 35,
      alt: "startup",
    },
    {
      src: `${process.env.ASSETS_PATH}/llp/springboard-clients-min-min.png`,
      width: 150,
      height: 40,
      alt: "springboard",
    },
    {
      src: `${process.env.ASSETS_PATH}/llp/oyo-clients-min.png`,
      width: 101,
      height: 43,
      alt: "oyo",
    },
    {
      src: `${process.env.ASSETS_PATH}/llp/chakra-clients-min.png`,
      width: 83,
      height: 61,
      alt: "chakra",
    },
    {
      src: `${process.env.ASSETS_PATH}/llp/dbs-clients-min.png`,
      width: 104,
      height: 38,
      alt: "dbs",
    },
    {
      src: `${process.env.ASSETS_PATH}/llp/uber-clients-min.png`,
      width: 93,
      height: 40,
      alt: "uber",
    },
    {
      src: `${process.env.ASSETS_PATH}/llp/ficci-clients-min.png`,
      width: 75,
      height: 52,
      alt: "ficci",
    },
    {
      src: `${process.env.ASSETS_PATH}/llp/ap-gov-min.png`,
      width: 108,
      height: 60,
      alt: "ap-gov",
    },
  ];

  const clientlogoProps = {
    clientLogs: clientLogoImages,
    heading: "Trusted by 400,000 clients and counting, including …",
  };
  const [activeItem, setActiveItem] = useState();
  const [visibleStickyFooter, setVisibleStickyFooter] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => toggleVisibleStickyFooter(), true);
    return () =>
      window.removeEventListener(
        "scroll",
        () => toggleVisibleStickyFooter(),
        false
      );
  }, []);

  const toggleVisibleStickyFooter = () => {
    const scrolled = document.body.scrollTop || window.pageYOffset;
    if (scrolled > 900 && window.innerWidth <= 768) {
      const container = document.getElementById("kommunicate-widget-iframe");
      if (container != null) {
        container.style.marginBottom = "70px";
      }
      setVisibleStickyFooter(true);
    } else if (scrolled <= 900) {
      const container = document.getElementById("kommunicate-widget-iframe");
      if (container != null) {
        container.style.marginBottom = "0";
      }
      setVisibleStickyFooter(false);
    }
  };

  return (
    <div id="banner-top">
      <div
        className={`md:flex bg-[#fafafa] ${
          stickyLinksContent ? `md:px-[110px]` : ` md:px-[30px]`
        } max-md:px-5`}
      >
        {!props.hideMenus && (
          <div className="w-[17%] max-md:hidden my-[20px]">
            <LeftMenuSection
              content={content}
              setActiveItem={setActiveItem}
              activeItem={activeItem}
            />
          </div>
        )}

        <div
          className={`${
            !props.hideMenus ? `md:w-[60%]` : `md:w-[70%]`
          }  flex flex-col gap-1 mt-5 md:pl-10 md:pr-20`}
        >
          <ServiceContent
            content={content}
            setActiveItem={setActiveItem}
            activeItem={activeItem}
          />
          {content?.faqs?.items?.length > 0 && <FaqSection content={content} />}
          {props.showDash && <DashBanner content={content} />}
          {/* {content?.brochure_content && (
          <div className="brochure_container_section">
            <ServiceBrochureForm datas={props.service} ismobile={ismobile} />
          </div>
        )} */}
          {content?.recentUpdates?.items?.length > 1 && (
            <RecentUpdateSection {...content.recentUpdates} />
          )}
          {content?.companyNameSearchForm && <CompanySearch data={content} />}
          {content?.partnerBenefitsContent && (
            <div
              className="scroll-m-20"
              id={content.partnerBenefitsContent.href}
            >
              <PartnerBenefitsNew
                {...content.partnerBenefitsContent}
                isMobile={ismobile}
              />
            </div>
          )}
          {/* {content.serviceTypes && content.serviceTypes.rows.length > 0 && (
            <Govt_Registrations serviceTypes={content.serviceTypes} />
          )} */}
        </div>
        <div className="max-md:hidden md:w-[30%]">
          <div className="pl-6 mt-6 top-20 sticky mb-10">
            {!props.hideMenus && <LeadForm {...formProps} />}
          </div>
          {stickyLinksContent && (
            <StickyUrlSection stickyLinksContent={stickyLinksContent} />
          )}
        </div>
      </div>
      <div>{props.showTestimonial && <TestimonialComponent />}</div>
      {content?.serviceTypes && (
        <GovernmentRegistrations {...content.serviceTypes} />
      )}
      <div>
        <ClientLogos {...clientlogoProps} />
      </div>
      {visibleStickyFooter && (
        <div className="md:hidden">
          <StickyFooter />
        </div>
      )}
      {props?.kommunicateGenricChatBot && props?.kommunicateServiceBotName && (
        <ChatBot {...chatBotProps} />
      )}
    </div>
  );
};

export default ServiceBody;
