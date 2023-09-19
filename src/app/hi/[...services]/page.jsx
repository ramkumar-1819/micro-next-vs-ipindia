import ServiceComponent from "@/components/servicePageComponents/serviceComponent";
import { redirect } from "next/navigation";
import { getDirectoryData } from "@/utils/serviceFinder";

async function getServiceContent(service) {
  try {
const res = getDirectoryData(service,"hi")
    console.log("result",res)
    return res;
  } catch (error) {
    console.log("ERROR", error);
    // redirect(`https://vakilsearch.com/${service}`); // Use redirect to navigate to the desired URL
  }
}

export async function generateMetadata({ params, searchParams }, parent) {
  const {
    services: [service],
  } = params;

  const metaContent = await getServiceContent(service);

  const metaData = metaContent?.meta
  const articleSchema = metaContent?.Schema?.articleSchema;

  return {
    title: metaContent?.pageTitle,
    keywords: metaData?.keyword,
    description: metaData?.description,
    alternates: {
      canonical: `/business-setup/${metaContent?.canonicalUrl}`,
    },
    openGraph: metaContent?.openGraph,
    twitter: metaContent?.twittercards,
    articleSchema: articleSchema,
  };
}

export default async function Page(params) {
  const service = params.params.services[0];
  const serviceContent = await getServiceContent(service);

  return <ServiceComponent {...serviceContent} />;
}
