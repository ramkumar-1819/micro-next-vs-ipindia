import ServiceComponentV2 from "@/components/servicePageComponents/serviceComponentV2";
import serviceData from "@/data/services/BusinessSetup/BusinessRegistration/startup-india-scheme.json";

export default async function Page() {
  return <ServiceComponentV2 {...serviceData} />;
}
