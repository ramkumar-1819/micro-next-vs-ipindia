import ServiceComponent from "@/components/servicePageComponents/serviceComponent";
import { redirect } from "next/navigation";
import { getDirectoryData } from "@/utils/serviceFinder";
import Head from "next/head";

async function getServiceContent(service, satellite) {
  try {
    const satelliteRelativePath = "src/data/satellite";
    const res = getDirectoryData(service, "en", satelliteRelativePath);
    const satelliteContent = res?.find((obj) => obj.url === satellite);
    console.log("result", satelliteContent);
    return satelliteContent;
  } catch (error) {
    console.log("ERROR", error);
    redirect(`https://vakilsearch.com`);
  }
}

// export async function generateMetadata({ params, searchParams }, parent) {
//   const {
//     services: [service],
//   } = params;

//   const metaContent = await getServiceContent(service);

//   const metaData = metaContent?.meta;
//   const articleSchema = metaContent?.Schema?.articleSchema;

//   return {
//     title: metaContent?.pageTitle,
//     keywords: metaData?.keyword,
//     description: metaData?.description,
//     alternates: {
//       canonical: `/business-setup/${metaContent?.canonicalUrl}`,
//     },
//     robots: {
//       index: false,
//       follow: false,
//       nocache: false,
//       googleBot: {
//         index: false,
//         follow: false,
//         noimageindex: false,
//         "max-video-preview": -1,
//         "max-image-preview": "large",
//         "max-snippet": -1,
//       },
//     },
//     openGraph: metaContent?.openGraph,
//     twitter: metaContent?.twittercards,
//     articleSchema: articleSchema,
//   };
// }

export default async function Page(params) {
  const service = params.params.services;
  const satellite = params.params.satellite;
  const serviceContent = await getServiceContent(service, satellite);
  // if (!serviceContent) {
  //   return redirect(`https://vakilsearch.com`);
  // }
  return <ServiceComponent {...serviceContent} />;
}
