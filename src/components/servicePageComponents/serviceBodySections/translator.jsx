import { eventTracking } from "@/utils/helperFunctions";
import Link from "next/link";

const TranslatorComp = (props) => {
  const { page } = props;
  const trackEvent = () => {
    if (props.url == "/online-gst-registration") {
      eventTracking(
        "",
        "landingPage",
        "landingPage",
        "click",
        "lang-click",
        "lang",
        props.target_lng
      );
    }
  };

  return (
    <div className="mt-2 bg-[#f7f7f7] w-fit mx-auto mb-10 text-[16px] p-1 px-4 rounded-[16px] max-md:text-center">
      <div className="">
        {/* {!props.tmpage && <div></div>}
        {props.tmpage && ( */}
        <div>
          <p
            className={`p-1 text-[14px] font-bold ${
              props.showBlueBanner ? "text-white" : "text-black"
            }`}
          >
            Now you can read this page in {props.current_lng}.{" "}
            {props.current_lng == "Hindi" ? (
              <Link
                href={`/hi/[...hindiservice]`}
                as={props.url}
                onClick={() => trackEvent()}
              >
                Change language to {props.target_lng}
              </Link>
            ) : props.current_lng == "English" ? (
              <Link
                href={`${page == "satellite" ? props.url : "/[service]"}`}
                as={props.url}
                onClick={() => trackEvent()}
              >
                Change language to {props.target_lng}
              </Link>
            ) : (
              ""
            )}
          </p>
        </div>
        {/* )} */}
      </div>
    </div>
  );
};
export default TranslatorComp;
