/* eslint-disable no-unused-vars */
import React, { useState, useRef } from "react";
import * as Yup from "yup";
import Image from "next/image";
import { LeadForm } from "@uber9/micro-next-common-lib";
import axios from "axios";
import CustomModal from "./Modals/customModal";
import Link from "next/link";

const industryList = [
  { label: "Digital Marketing", value: "digital_marketing" },
  { label: "Offline Marketing", value: "offline_marketing" },
  { label: "Service Ecommerce", value: "service_ecommerce" },
  { label: "Marketplace Ecommerce", value: "marketplace_ecommerce" },
  { label: "Inventory Ecommerce", value: "inventory_commerce" },
  { label: "Product Based Software", value: "product_based_software" },
  { label: "Service Based Software", value: "service_based_software" },
  { label: "Retail Business", value: "retail_business" },
  { label: "Others", value: "others" },
];

const ServiceBrochureForm = (props) => {
  const {
    formTitle,
    formDescription,
    brochure_image,
    submitCTA,
    href = "",
  } = props;

  const [leadStatus, setLeadStatus] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleCloseModal = () => setShowModal(false);

  const sendBrouchure = (requestData) => {
    const { email, phone, industryType, whatsappOptIn } = requestData;

    axios({
      url: `${process.env.SITE_BASE_URL}/api/brochure-lead-creation`,
      method: "POST",
      data: {
        email: email,
        mobile_number: phone,
        industry_type: industryType,
        whatsapp_brochure: whatsappOptIn,
        channel: "service_form_brochure",
      },
    })
      .then((res) => {
        let {
          data: { type },
        } = res;
        setLeadStatus(type);
        setShowModal(true);
        console.log("SUCCESSSS", res);
      })
      .catch((err) => console.log("ERRRORRRR", err.message));
  };

  const formProps = {
    formData: {
      formTitle,
      formDescription,
      CTA: submitCTA,
      customWhatsappText: "I agree to receive the brochure on",
      bannerImage: {
        src: brochure_image,
        alt: "Brochure Image",
      },
      hideCityField: true,
      fields: [
        {
          label: "Industry",
          keyName: "industryType",
          errorText: "Please select Industry type",
          options: [...industryList],
        },
      ],
    },
    leadCallback: sendBrouchure,
  };

  return (
    <div className="my-5 scroll-m-20" id={href}>
      <LeadForm {...formProps} />
      <CustomModal show={showModal} onClose={handleCloseModal}>
        <div className="flex flex-col items-center gap-2 p- w-full p-5 md:p-10 rounded bg-white text-center md:max-w-lg">
          {leadStatus === "success" ? (
            <>
              <Image
                src={`${process.env.ASSETS_PATH}/live-images/success_mail.svg`}
                width={200}
                height={200}
                alt="success"
              />
              <b className="text-[18px]">Brochure sent successfully!</b>
              <p>
                The requested industry brochure has been successfully sent to
                the selected platform.
              </p>
            </>
          ) : (
            <>
              <Image
                src={`${process.env.ASSETS_PATH}/live-images/duplicate_img.svg`}
                width={100}
                height={100}
                alt="success"
              />
              <b className="text-[18px] text-[#e83e3e]">
                You've reached your maximum limit!
              </b>
              <p>
                Looks like you've reached the maximum download limit for the
                brochure! For any further queries, please reach us at{" "}
                <Link href="mailto:support@vakilsearch.com">
                  support@vakilsearch.com
                </Link>
              </p>
            </>
          )}
          <button
            className="rounded bg-[#ffd200] text-[#231f20] font-bold py-3 px-20 mt-4 cursor-pointer"
            onClick={handleCloseModal}
          >
            Close
          </button>
        </div>
      </CustomModal>
    </div>
  );
};
export default ServiceBrochureForm;
