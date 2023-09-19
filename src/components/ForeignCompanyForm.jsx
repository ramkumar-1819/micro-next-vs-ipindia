import { useState, useEffect, useRef } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import Select from "react-select";
import axios from "axios";
import { DropdownIcon, ReactExptSelectStyles } from "./reactSelect";
import Router from "next/router";
import formValidations from "./../utils/formValidations";
import countries from "./../data/countries.json";
import { citiesJson } from "./../data/cities";
import Image from "next/image";
import Switch from "react-switch";
import Spinner from "./servicePageComponents/Spinner";

const serviceId = "849";

const citylistupdate = () => {
  let checkcitiesarray = citiesJson[0];
  if (checkcitiesarray.length > 0) {
    return [];
  }
  return checkcitiesarray.cities.map((obj) => {
    return { label: obj.text, value: obj.id };
  });
};

const cityList = citylistupdate();

const ForeignCompanyForm = (props) => {
  const { content, setShowModal } = props;

  const formRef = useRef();
  const [loader, setLoader] = useState(false);
  const [validEmail, setValidEmail] = useState(false);
  const [currentUrl, setCurrentUrl] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [isWhatsappOptin, setIsWhatsappOptin] = useState(true);
  const {
    checkmobile,
    validateEmail,
    validateMobile,
    validateEmailNew,
    setMobileNumberValue,
  } = formValidations;

  useEffect(() => {
    setCurrentUrl(window.location.href);
  }, [currentUrl]);

  const userTrack = (ticket_id, values) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var cookie = document.cookie;
    var referrer = document.referrer;
    var userAgent = navigator.userAgent || "";
    var localreferrer = document.localreferrer || "";
    var user_track_data = {
      cookie: cookie,
      referrer: referrer,
      url: currentUrl,
      localreferrer: localreferrer,
      userAgent: userAgent,
      ticketId: ticket_id,
      flag: "foreign-company-form",
      email: values.email,
      mobile: values.mobileNumber,
      city: values.city?.label,
      language: "NA",
      serviceId: serviceId,
      channel: "foreign-company-form-primary",
    };
    // usertracking.trackuser(user_track_data, "cart");
  };

  const handleSubmit = (values) => {
    setLoader(true);
    axios({
      url: `${process.env.SITE_BASE_URL}/api/process-lead`,
      method: "post",
      headers: {
        xapikey: process.env.LEAD_PROCESS_XAPI_KEY,
      },

      data: {
        values: {
          email: values.email,
          mobileNumber: values.mobileNumber,
          country: values.country,
          city: values.city,
          serviceId,
          language: props.language,
          channel_opt_in: isWhatsappOptin,
          ticket_source_id: 110,
        },
      },
    })
      .then((res) => {
        const ticketDetails = res.data?.ticket;
        if (ticketDetails.Message == "Ticket created succesfully") {
          Router.push("/thank-you");
        } else if (ticketDetails.Message == "Duplicate Ticket") {
          Router.push(`/thank-you?duplicateTicket=${true}`, "/thank-you");
        } else {
          Router.push("/thank-you");
        }
        userTrack(ticketDetails.id, values);
      })
      .catch((error) => {
        console.log(error.message);
      })
      .finally(() => setTimeout(() => setLoader(false), 5000));
  };

  const schemavalidation = () => {
    const schemaobj = {
      email: Yup.string().required("Please enter your email address"),
      mobileNumber: Yup.string()
        .required("Please enter your phone number")
        .matches(/^((?!(0))[0-9]{10})$/g, "Please enter a valid phone number"),
      city: Yup.object().required("Please select City"),
      country: Yup.object().required("Please select Country"),
    };
    return schemaobj;
  };

  const serviceInitialValues = {
    email: "",
    mobileNumber: "",
    country: "",
    city: "",
  };

  const RegisterServiceSchema = Yup.object().shape(schemavalidation());

  return (
    <>
      <Formik
        initialValues={serviceInitialValues}
        validationSchema={RegisterServiceSchema}
        onSubmit={(values, actions) => {
          handleSubmit(values);
        }}
        innerRef={formRef}
      >
        {({ errors, touched, isValid, dirty, setFieldValue, values }) => (
          <Form
            method={values.formurl ? values.formurl.method : "post"}
            id="foreign-company-form-primary"
          >
            <div className="bg-white p-4 rounded-md flex flex-col gap-4 md:min-w-[380px]">
              <div
                className="flex justify-between"
                onClick={() => setShowModal(false)}
              >
                <b className="grow text-center text-[18px] md:text-[20px]">
                  {content.title}
                </b>
                <Image
                  src={`${process.env.ASSETS_PATH}/close-icon.svg`}
                  height={20}
                  width={20}
                  alt="close-icon"
                  className="cursor-pointer"
                />
              </div>
              <div className="flex flex-col gap-4">
                <div>
                  <label className="flex flex-col gap-1">
                    <p className="text-[14px] font-bold">Email</p>
                    <Field
                      name="email"
                      id="foreign_company_primary_email"
                      type="text"
                      // validate={(value) =>
                      //   validateEmail(value, validEmail, setValidEmail)
                      // }
                      onChange={(e) => {
                        e.target.value.length <= 50 &&
                          setFieldValue("email", e.target.value);
                        setValidEmail(false);
                      }}
                      className="w-full p-3 rounded-md bg-[#f0f1f3]"
                      placeholder={`Enter email address*`}
                      onBlur={(e) => {
                        const value = e.target.value;
                        validateEmailNew(value, validEmail)
                          .then((response) => {
                            if (response) {
                              const { msg, status } = response;
                              if (status == "error") setValidEmail(msg);
                              else if (status == "success") setValidEmail(true);
                              else setValidEmail(false);
                            }
                          })
                          .catch((fail) => {
                            console.info("error: ", fail);
                          });
                      }}
                    />
                    {(errors.email && touched.email) ||
                    typeof validEmail == "string" ? (
                      <div className="text-[#a94342] text-[14px] relative">
                        {errors.email || validEmail}
                      </div>
                    ) : null}
                  </label>
                </div>
                <div>
                  <label className="flex flex-col gap-1">
                    <p className="text-[14px] font-bold">Mobile Number</p>
                    <Field
                      name="mobileNumber"
                      id="foreign_company_form_primary_mobile"
                      type={checkmobile == true ? "number" : "text"}
                      validate={validateMobile}
                      onChange={(e) =>
                        setMobileNumberValue(
                          "mobileNumber",
                          e.target.value,
                          setFieldValue
                        )
                      }
                      className="w-full p-3 rounded-md bg-[#f0f1f3]"
                      placeholder={`Enter mobile number*`}
                    />
                    {errors.mobileNumber && touched.mobileNumber ? (
                      <div className="text-[14px] text-[#a94342] relative">
                        {errors.mobileNumber}
                      </div>
                    ) : null}
                  </label>
                </div>
                <div className="flex flex-col gap-1">
                  <p className="text-[14px] font-bold">Country</p>
                  <Select
                    instanceId={"2"}
                    className="placeholder:text-red-500"
                    name="country"
                    id="foreign_company_form_country"
                    onChange={(option) => {
                      option == null
                        ? setFieldValue("country", "")
                        : setFieldValue("country", option);
                      setSelectedCountry(option ? option.value : "");
                    }}
                    options={countries}
                    isClearable={true}
                    placeholder="Select country for incorporation*"
                    styles={ReactExptSelectStyles}
                    components={{ DropdownIcon }}
                  />
                  {errors.country && touched.country ? (
                    <div className="text-[14px] text-[#a94342] relative">
                      {errors.country}
                    </div>
                  ) : null}
                </div>
                <div className="flex flex-col gap-1">
                  <p className="text-[14px] font-bold">Location</p>
                  <Select
                    instanceId={"3"}
                    className="selectdropdown"
                    name="city"
                    id="foreign_company_form_city"
                    onChange={(option) => {
                      option == null
                        ? setFieldValue("city", "")
                        : setFieldValue("city", option);
                    }}
                    options={cityList}
                    placeholder={`Select current city of operation*`}
                    isClearable={false}
                    noOptionsMessage={() => "No City found"}
                    styles={ReactExptSelectStyles}
                    components={{ DropdownIcon }}
                  />
                  {errors.city && touched.city ? (
                    <div className="text-[14px] text-[#a94342] relative">
                      {errors.city}
                    </div>
                  ) : null}
                </div>
              </div>
              <div className="font-bold">
                <p className="flex flex-wrap items-center gap-1 text-sm md:text-base">
                  {"Get easy updates through"}
                  <Image
                    src="https://assets.vakilsearch.com/live-images/account-bookkeeping/logos_whatsapp.svg"
                    width={24}
                    height={24}
                    alt="Whatsapp"
                  />
                  {"Whatsapp"}
                  <Switch
                    onChange={(checked) => setIsWhatsappOptin(checked)}
                    checked={isWhatsappOptin}
                    onColor="#00C853"
                    offColor="#BDBDBD"
                    height={18}
                    width={32}
                    uncheckedIcon={false}
                    checkedIcon={false}
                    className="ml-1"
                  />
                </p>
              </div>
              <button
                className="font-bold !bg-[#f2d000] w-full py-3 rounded flex justify-center"
                onClick={() => {
                  setFieldValue("formurl", "/post");
                  setFieldValue("freeconsultation", false);
                }}
                disabled={loader}
                variant="primary"
                type="submit"
                id="foreign_company_primary_lead_submit"
              >
                {loader ? <Spinner /> : content.submit}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default ForeignCompanyForm;
