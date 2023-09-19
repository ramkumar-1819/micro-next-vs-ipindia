import Image from "next/image";

const dashboardArray = [
  { type: "business" },
  { type: "phone" },
  { type: "emi" },
];
const ServiceDashBoard = (props) => {
  const language = props.language;
  function renderData(obj, index) {
    if (obj.type == "business") {
      return (
        <div key={index}>
          <div className="flex gap-3">
            <Image
              alt="noimage"
              src="https://assets.vakilsearch.com/live-images/website_revamp/service-review1.svg"
              height={27}
              width={27}
            />
            <span>400,000 +</span>
          </div>
          <p>
            <b>
              {language == "en" ? "Business Served" : "व्यापार सेवित"}
            </b>
          </p>
        </div>
      );
    } else if (obj.type == "emi") {
      return (
        <div key={index}>
          <div className="flex gap-3">
            <Image
              alt="noimage"
              src="https://assets.vakilsearch.com/live-images/website_revamp/service-review3.svg"
              height={25}
              width={25}
            />
            <span>{language == "en" ? "EMI" : "सरल"}</span>
          </div>
          <p>
            <b>
              {language == "en" ? "Easy EMI Options" : "पेमेंट ऑप्शन"}
            </b>
          </p>
        </div>
      );
    }
  }
  return (
    // <div>
    //   {props.ismobile &&<div className="reviews-google-mob">
    //     <Image
    //       className="mobile-Google"
    //       layout="fill"
    //       objectFit='contain'
    //       src="https://assets.vakilsearch.com/live-images/color-bg-google-review.svg"
    //       alt="google reviews"
    //     />
    //   </div>}
    <div className="pl-14 flex gap-14">
      {dashboardArray.map((obj, key) => {
        return renderData(obj, key);
      })}
    </div>
  );
};
export default ServiceDashBoard;
