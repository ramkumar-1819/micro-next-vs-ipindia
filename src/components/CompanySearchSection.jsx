"use client";
import { useState, useRef } from "react";
import Router from "next/router";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import Image from "next/image";

const RegisterServiceSchema = Yup.object().shape({
  companyName: Yup.string().required("Enter your company name"),
});
//
const CompanySearch = (props) => {
  // const{content}=props;
  const {
    data: { companyNameSearchForm },
  } = props;
  const isMobile = props.isMobile;
  const formRef = useRef();

  const handleCompanySearch = (values) => {
    window.location.assign(
      `${process.env.ENVURLS}/company/new-search?cname=${values.companyName}`
    );
  };

  return (
    <>
      <Formik
        initialValues={{
          companyName: "",
        }}
        validationSchema={RegisterServiceSchema}
        onSubmit={handleCompanySearch}
        innerRef={formRef}
      >
        {({ errors, setFieldValue }) => (
          <Form id="company_name_search">
            <section
              className="py-[5px] px-[1px] scroll-m-20"
              id={companyNameSearchForm?.href}
            >
              <div>
                <h3 className="font-[700] text-[26px] leading-[30px] text-[#000]">
                  {companyNameSearchForm.title}
                </h3>
                <p className="font-[400] text-[18px] pb-4 mt-0">
                  {companyNameSearchForm.subTitle}
                </p>
                <div className="flex">
                  <Field
                    className="w-[80%] py-[10px] px-[6px] border-[1px] border-[#cecece] rounded font-[400] text-[16px] leading-[19px] text-[#252526] focus:outline-none"
                    type="text"
                    name="companyName"
                    placeholder="Enter your business name"
                    autoComplete="off"
                    onChange={(e) => {
                      setFieldValue("companyName", e.target.value);
                    }}
                  />

                  <button
                    className="flex justify-center items-center !bg-[#fcd209] rounded-r ml[-1px] font-[600] leading-[22px] w-[23%]"
                    type="submit"
                    id="company_search_submit"
                  >
                    <p className="hidden md:!block">Search now</p>
                    <Image
                      className="block md:!hidden"
                      src={
                        "https://assets.vakilsearch.com/live-images/trademark-search/glassIcon.svg"
                      }
                      alt="searchicon"
                      width={20}
                      height={20}
                    />
                  </button>
                </div>
                {errors.companyName ? (
                  <div className="text-[#a94342] text-[14px]">
                    {errors.companyName}
                  </div>
                ) : null}
              </div>
            </section>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default CompanySearch;
