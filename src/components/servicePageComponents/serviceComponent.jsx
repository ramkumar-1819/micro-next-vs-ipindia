"use client";
import { useState, useEffect } from "react";
import HeroBanner from "./heroBanner";
// import RecentBlog from "./recentBlog";
import ServiceBody from "./serviceBodySections";
import StateWiseList from "./serviceBodySections/statewiseList";
import { ZOLVIT_BAR_KEY } from "@/utils/constants";
import RecommendedPages from "../RecommendedPages";
import PVTAddPage from "../pvtAddPageComponents";
import Head from "next/head";
// import { NextSeo } from "next-seo";
// import { SEOComponent } from "./seoComponent";

import { Header, Footer } from "@uber9/micro-next-common-lib";

const ServiceComponent = (props) => {
  // const { recentBlogs } = props.content;
  // state.
  const [isMobile, setIsMobile] = useState(false);
  const [showZolvitAnnouncement, setShowZolvitAnnouncement] = useState(false);

  // effects.
  useEffect(() => {
    const onWindowResize = () => setIsMobile(window.innerWidth < 768);
    onWindowResize();
    const announcementShown = localStorage.getItem(ZOLVIT_BAR_KEY);
    !announcementShown && setShowZolvitAnnouncement(true);

    window.addEventListener("resize", onWindowResize);
    return () => window.removeEventListener("resize", onWindowResize);
  }, []);

  const handleAnnouncementClose = () => {
    localStorage.setItem(ZOLVIT_BAR_KEY, "true");
    setShowZolvitAnnouncement(false);
  };

  /*
    showZolvitAnnouncement={showZolvitAnnouncement}
        onAnnouncementClose = {() => {
          localStorage.setItem(ZOLVIT_BAR_KEY, 'true');
          setShowZolvitAnnouncement(false);
        }}
        homeRedirection={window.location.href}
  */

  return (
    <>
      <Header {...props} isMobile whiteNavBar />
      {/* <SEOComponent {...props.seoContent} /> */}
      {/* <NextSeo {...props.seo} /> */}
      <HeroBanner {...props} isMobile />
      {!props.pvtAddBanner ? (
        <>
          <ServiceBody {...props} isMobile />
          <StateWiseList {...props} />
          {props?.content?.recommendedPages && (
            <RecommendedPages
              serviceUrl={props?.serviceUrl || props?.url}
              url={props?.url}
              data={props?.recommendedPages}
            />
          )}
        </>
      ) : (
        <PVTAddPage {...props} />
      )}

      {/* {recentBlogs && <RecentBlog recentBlogs={recentBlogs} />} */}
      <Footer {...props} isMobile />
    </>
  );
};

export default ServiceComponent;
