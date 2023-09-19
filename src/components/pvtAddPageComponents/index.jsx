import BenifitsSection from "./benifitsSection";
import DBSBanner from "./dbsBanner";
import DocumentRequired from "./documentsRequired";
import PartnerBenifits from "./partnerBenifits";
import PricingPackage from "./pricingPackage";
import ProcessSteps from "./processSteps";
import PVTFAQSection from "./pvtFaqSection";
import WhyVakilSearch from "./whyVakilsearch";

const PVTAddPage = (props) => {
  const {
    procesStepsSection,
    pricingPackage,
    documentsRequired,
    benifitsSection,
    whySection,
    partnerBenifits,
    faqSection,
    dbsBanner,
  } = props.content;
  return (
    <>
      <DBSBanner data={dbsBanner} />
      <div className="max-md:mx-4 flex flex-col gap-[40px] md:gap-[70px] md:py-10 py-6">
        <ProcessSteps data={procesStepsSection} />
        <PricingPackage pricing={pricingPackage} />
        <DocumentRequired data={documentsRequired} />
        <BenifitsSection data={benifitsSection} />
        <WhyVakilSearch data={whySection} />
        <PartnerBenifits data={partnerBenifits} />
        <PVTFAQSection data={faqSection} />
      </div>
    </>
  );
};

export default PVTAddPage;
