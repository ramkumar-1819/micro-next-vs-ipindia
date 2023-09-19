import Image from "next/image";
import { Fragment, useState } from "react";
import OpenModal from "../../../serviceComponents/openModal";
import HeroBannerSlider from "../../../serviceComponents/heroBannerSlider";
import parse from "html-react-parser";
import { GoogleReview } from "@uber9/web-react-components";
import TermsAndCondtions from "@/components/TermsAndCondition";
import NewTestimonial from "@/components/pvtAddPageComponents/newtestimonial";
import useIsMobile from "@/utils/findIsMobile";
import VideoComp from "@/components/VideoComponent";
import CustomModal from "@/components/Modals/customModal";
import Slider from "react-slick";
import BannerReviews from "@/components/BannerReview";
import Parser from "@/components/globalComponents/parser";

const LeftFold = (props) => {
  const isMobile = useIsMobile();
  const { content } = props;
  const [modalShow, setModalShow] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [video, setVideo] = useState(false);
  const [licenseModal, setLicenseModal] = useState(false);

  const settings = {
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    vertical: true,
    arrows: false,
    speed: 750,
    autoplaySpeed: 1500,
    pauseOnHover: false,
  };

  const handleCertificateModal = () => {
    setLicenseModal(!licenseModal);
  };
  const h1Style = props.b2bServicePage
    ? `text-[24px] font-medium md:text-[44px] md:leading-10 ${
        props.pvtAddBanner
          ? "md:leading-[52px]"
          : props.showYellowBorder
          ? "md:border-[#fcd209] md:border-b-[4px] md:w-fit leading-1"
          : props.Noflag
          ? ""
          : "after:hidden after:md:block relative after:md:border-blue-500 after:md:border-b-[1px] after:md:w-[15%] "
      } `
    : props.satelliteBanner
    ? `text-[24px] font-bold md:text-[40px] leading-1`
    : props.showBlueBorder
    ? "after:hidden after:md:block relative after:md:border-blue-500 after:md:border-b-[2px] after:md:w-[15%] text-[24px] font-bold md:text-[40px] leading-[2.5rem]"
    : props.Noflag
    ? ""
    : `text-[24px] font-bold md:text-[40px] leading-1`;

  const handlePricingPackage = () => {
    const pricingPackage = document.querySelector("#pricing-package");
    if (pricingPackage) {
      pricingPackage.scrollIntoView({ behavior: "smooth" });
    }
  };

  console.log("PROPS", props, props.showYellowBorder);
  return (
    <div className={`flex flex-col gap-4 min-w-0`}>
      {content.title && (
        <h1 className={h1Style}>{<Parser content={content.title} />}</h1>
      )}
      {content?.slickText && (
        <Slider className="z-10 -mt-3" {...settings}>
          {content?.slickText?.map((text, index) => (
            <h3
              key={index}
              className="max-w-fit text-2xl md:text-4xl font-bold bg-[#007aff] text-transparent bg-clip-text"
            >
              {text}
            </h3>
          ))}
        </Slider>
      )}

      {/* {props.showYellowBorder && (
        <hr className=" md:mt-[-10px] md:border-b-[3px] md:border-[#FCD209] max-md:hidden"></hr>
      )} */}

      {content?.subTitle && (
        <p
          className={`text-[16px] font-medium ${
            props.hideSubTitle ? "hidden" : "block"
          }`}
        >
          {parse(content?.subTitle)}
          <span>
            {props?.conditionsApply && (
              <TermsAndCondtions terms={props?.conditionText} />
            )}
          </span>
        </p>
      )}
      {/* {props.subTitleConditionsApply && (
        <TermsAndCondtions text={props.conditionText} />
      )} */}

      {content.subText && <span>{<Parser content={content.subText} />}</span>}
      {content?.formSection?.list && (
        <ul className="flex flex-col gap-4 md:gap-3 md:pt-6 py-4">
          {content.formSection.list.map((item, index) => {
            return (
              <li
                key={index}
                className="flex items-start gap-[10px] text-[16px] text-[#606162]"
              >
                <Image
                  src="https://assets.vakilsearch.com/live-images/blue-white-tick-b2b.svg"
                  width={16}
                  height={16}
                  alt="blue tick"
                  className="mt-1"
                />
                <p>
                  {parse(item)}
                  {props?.conditionsApply && index === 0 && (
                    <TermsAndCondtions terms={props?.conditionText} />
                  )}
                </p>
              </li>
            );
          })}
        </ul>
      )}

      {content.video && props?.showWatchNow && (
        <Fragment>
          <div>
            {props?.showWatchNow && (
              <Image
                alt="Watch Video"
                src={`${
                  content.runningCampaign
                    ? "https://assets.vakilsearch.com/live-images/video-play/play+button.svg"
                    : props.experimentPageAPVT
                    ? "https://assets.vakilsearch.com/live-images/youtube_play.svg"
                    : props.tileCartPage
                    ? "https://assets.vakilsearch.com/live-images/video-play/watch_now-blackyellow.png"
                    : "https://assets.vakilsearch.com/live-images/video-play/watch_now-yellowblack.png"
                }`}
                width={`${
                  content.runningCampaign
                    ? "34"
                    : content.newPvtWithReview
                    ? "34"
                    : "150"
                }`}
                height={`${content.newPvtWithReview ? "34" : "34"}`}
                className={`cursor-pointer p-0 ${
                  !content?.runningCampaign && "block"
                }`}
                onClick={() => setModalShow(true)}
              />
            )}
          </div>
          <VideoComp
            videourl={content.video}
            show={modalShow}
            onHide={() => setModalShow(false)}
          />
        </Fragment>
      )}
      {(props?.showClickToWatch || content?.modalTitle) && (
        <div className="flex gap-6">
          {props?.showClickToWatch && (
            <button
              onClick={() => {
                setOpenModal(true), setVideo(true);
              }}
              className="flex gap-2 md:gap-4 items-center max-md:p-1"
            >
              <Image
                src="https://assets.vakilsearch.com/live-images/youtube_play.svg"
                width={30}
                height={30}
                alt="video"
              />
              <p className={`text-[13px] font-semibold text-start order-1`}>
                Click to watch 60 seconds video
              </p>
            </button>
          )}
          {props.pvtAddBanner && (
            <button
              onClick={handlePricingPackage}
              className="flex gap-[11px] text-[14px] font-medium items-center underline text-start"
            >
              <Image
                src="https://assets.vakilsearch.com/do.svg"
                width={20}
                height={26}
                alt="certificate"
              />
              View Package
            </button>
          )}
          {content?.modalTitle && (
            <button
              onClick={() => {
                setOpenModal(true), setVideo(false);
              }}
              className={`flex gap-3 items-center max-md:border-[1px] ${
                props.hideBorder
                  ? "border-none"
                  : "max-md:border-[#d9dde4] max-md:w-[40%] max-md:p-1"
              }`}
            >
              <Image
                onClick={handleCertificateModal}
                src={content.certificateLogo}
                width={34}
                height={34}
                alt="certificate"
              />
              <p
                className="text-left text-[14px] underline"
                onClick={handleCertificateModal}
              >
                {content?.modalTitle}
              </p>
            </button>
          )}
          <CustomModal
            onClose={() => {
              setLicenseModal(false);
            }}
            outSideClickClose={() => {
              setLicenseModal(false);
            }}
            show={licenseModal}
          >
            <Image
              src={content.certificateImage}
              width={content.biscertificate ? 824 : 540}
              height={content.biscertificate ? 543 : 700}
              alt={content.certificateImgAltText || `sample certificate image`}
            />
          </CustomModal>
        </div>
      )}
      {/* {content.bannerInsight && (
        <p
          className={`max-md:hidden ${
            props.b2bServicePage ? `text-[20px] md:pt-6` : `text-[26px]`
          }`}
        >
          {<Parser content={content.bannerInsight} />}
        </p>
      )} */}
      {!(props.pvtAddBanner | props.hideReview) && (
        <div className={`inline-flex mt-5 max-md:hidden`}>
          {
            <GoogleReview
              classNames={
                props?.showWhiteColor && {
                  taglineClass: "!text-[#fafafa]",
                  sectionClass: "!text-[#fafafa]",
                }
              }
            />
          }
        </div>
      )}
      {props?.serviceItems &&
        props?.serviceItems.length > 0 &&
        props.serviceItems.map((item, index) => (
          <div
            className={
              props.showBlackColor
                ? "text-black mt-3"
                : props.showWhite
                ? "text-white mt-3"
                : "hidden"
            }
            key={`service_item_${index}`}
          >
            <span>
              <b className={props.showBlackColor ? "text-black" : "text-white"}>
                {item.header}
              </b>
            </span>
            <ol className="mt-2">
              {item.items.map((i, ind) => (
                <li key={`item_${ind}`}>{i}</li>
              ))}
            </ol>
          </div>
        ))}
      {props.bannerInsight && (
        <h3 className="text-[26px] leading-[36px] font-[400] text-[#303030] hidden md:!block">
          {parse(props.bannerInsight)}
        </h3>
      )}
      {props?.bannerReviewContent && (
        <div className="hidden md:!block w-full">
          <BannerReviews data={props.bannerReviewContent} />
        </div>
      )}
      {content.testimonials && (
        <div className="max-md:hidden">
          <NewTestimonial testimonials={content.newTestimonials} />
        </div>
      )}

      {openModal && content?.video && (
        <OpenModal
          show={openModal}
          setClose={setOpenModal}
          video={video}
          link={video ? content.video : content.certificate}
        />
      )}
    </div>
  );
};

export default LeftFold;
