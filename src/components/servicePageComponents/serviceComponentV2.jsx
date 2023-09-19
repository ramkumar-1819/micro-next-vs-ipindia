"use client";

import StartupFirstFold from "./heroBanner/firstFold/startupIndia";
import { Header, Footer } from "@uber9/micro-next-common-lib";

const ServiceComponentV2 = (props) => {
  return (
    <div>
      <Header {...props} whiteNavBar />
      <StartupFirstFold {...props} />
      <div id="vs-footer">
        <Footer {...props} isMobile />
      </div>
    </div>
  );
};

export default ServiceComponentV2;
