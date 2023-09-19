/* eslint-disable no-unused-vars */
import React, { useState, useRef } from 'react';
// import { Col, Row, Button, Modal, Spinner } from 'react-bootstrap';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import  Select from 'react-select';
import Image from 'next/image';

// import usertracking from '../../../utils/usertracking';
import { DropdownIcon,ReactExptSelectStyles } from '@/components/reactSelect';
import formValidations from '@/utils/formValidations';
import axiosRequests from '@/utils/paymentFunctions';

const industryList = [
  { label: 'Digital Marketing', value: 'digital_marketing' },
  { label: 'Offline Marketing', value: 'offline_marketing' },
  { label: 'Service Ecommerce', value: 'service_ecommerce' },
  { label: 'Marketplace Ecommerce', value: 'marketplace_ecommerce' },
  { label: 'Inventory Ecommerce', value: 'inventory_commerce' },
  { label: 'Product Based Software', value: 'product_based_software' },
  { label: 'Service Based Software', value: 'service_based_software' },
  { label: 'Retail Business', value: 'retail_business' },
  { label: 'Others', value: 'others' },
];

const RegisterServiceSchema = Yup.object().shape({
  email: Yup.string().required('Please enter your email address'),
  mobileNumber: Yup.string()
    .required('Please enter your phone number')
    .min(10, 'Please enter a valid phone number')
    .matches(/^[1-9]{1}[0-9]+/, 'Please enter a valid phone number'),
  industry: Yup.string().required('Please select Industry type'),
});

const {
  checkmobile,
  validateEmail,
  validateMobile,
  validateEmailNew,
  setMobileNumberValue,
} = formValidations;

const ServiceBrochureForm = (props) => {
  const page = props.datas.page;
  const serviceId = props.datas.content.serviceId;
  const content = props?.datas.content.brochure_content;
  const brochureBtn = props?.datas.content.submitBrochureBtn;
  const formRef = useRef();

  const [loader, setloader] = useState(false);
  const [isWhatsappOptin, setIsWhatsappOptin] = useState(true);
  const [validEmail, setValidEmail] = useState(false);
  const [show, setShow] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const { ismobile } = props;

  const handleCloseModal = () => {
    setShowModal(false);
    setShow(false);
  };

  return (
    <>
      <Formik
        initialValues={{
          email: '',
          mobileNumber: '',
          industry: '',
        }}
        validationSchema={RegisterServiceSchema}
        onSubmit={(values, actions) => {
          setloader('cart');
          var leadobj = {
            channel: 'service_form_brochure',
            email: values.email,
            mobileNumber: values.mobileNumber,
            industry_type: values.industry.value,
            whatsapp_brochure: isWhatsappOptin,
            city: { value: 'other cities' },
            language: 'en',
            serviceId,
            page,
          };
          axiosRequests.apiBrochureLeadCreation(leadobj, (obj) => {
            if (obj.type === 'success') {
              setShow(true);
              setloader('');
              formRef.current.resetForm();
            }
            if (obj.type === 'duplicate') {
              setShowModal(true);
              setloader('');
              formRef.current.resetForm();
            }
          });
        }}
        innerRef={formRef}
      >
        {({ errors, touched, setFieldValue, values }) => (
          <Form method="post" id="lead_form_brochure">
            <div className="service_brochure_form">
              <div className="text-center header_div">
                <h3 className="brochure_title">{content.title}</h3>
                <p className="brochure_subtitle">{content.subTitle}</p>
              </div>
              <div className={`row m-0 ${ismobile ? 'flex-reverse' : ''}`}>
                <div className="col-md-7 brochureForm">
                  <Row>
                    <Col md={12}>
                      <label className={`custom_label pt-2`}>
                        <Field
                          name="email"
                          id="brochure_form_primary_email"
                          type="text"
                          onChange={(e) => {
                            e.target.value.length <= 50 &&
                              setFieldValue(
                                'email',
                                e.target.value.replace(/ /g, ''),
                              );
                            setValidEmail(false);
                          }}
                          placeholder="Email*"
                        />
                        {errors.email && touched.email ? (
                          <div className="validation-container validation-error relative">
                            {errors.email}
                          </div>
                        ) : null}
                      </label>
                    </Col>
                    <Col md={12}>
                      <label className={`custom_label pt-2`}>
                        <Field
                          name="mobileNumber"
                          id="brochure_form_primary_mobile_number"
                          type={checkmobile == true ? 'number' : 'text'}
                          validate={validateMobile}
                          placeholder="Mobile Number*"
                          onChange={(e) =>
                            setMobileNumberValue(
                              'mobileNumber',
                              e.target.value,
                              setFieldValue,
                            )
                          }
                        />
                        {errors.mobileNumber && touched.mobileNumber ? (
                          <div className="validation-container validation-error relative">
                            {errors.mobileNumber}
                          </div>
                        ) : null}
                      </label>
                    </Col>
                    <Col lg={12} md={12}>
                      <label className="custom_label pt-2">
                        <Select
                          instanceId={'2'}
                          className="selectdropdown"
                          name="industry"
                          id="brochure_form_primary_industry"
                          onChange={(option) => {
                            option == null
                              ? setFieldValue('industry', '')
                              : setFieldValue('industry', option);
                          }}
                          options={industryList}
                          isClearable={true}
                          placeholder="Select Industry*"
                          styles={ReactExptSelectStyles}
                          components={{ DropdownIcon }}
                        />
                        {errors.industry && touched.industry ? (
                          <div className="dropdownerror validation-container validation-error relative">
                            {errors.industry}
                          </div>
                        ) : null}
                      </label>
                    </Col>
                    <Col md={12} className={'text-center p-1'}>
                      <span className="whatsapp_title brochure_whatsapp_toggles">
                        I agree to receive the brochure on <br />
                        <i className="fab fa-whatsapp text-success font-weight-bold"></i>
                        Whatsapp
                        <div
                          className="ml-2 switch"
                          onClick={() => setIsWhatsappOptin(!isWhatsappOptin)}
                        >
                          <div
                            className={`switch_bg ${
                              isWhatsappOptin ? 'bg-success' : 'bg-secondary'
                            }`}
                          >
                            <div
                              className={`switch_handle ${
                                isWhatsappOptin ? 'switch_on' : 'switch_off'
                              }`}
                            />
                          </div>
                        </div>
                      </span>
                    </Col>
                  </Row>
                  <div md={12} className={'mt-2'}>
                    <Button
                      className="brochure-btn"
                      disabled={loader == 'cart' || loader == 'additonalform'}
                      onClick={() => {
                        setFieldValue('formurl', '');
                        setFieldValue('freeconsultation', false);
                      }}
                      type="submit"
                      id="primary_lead_submit"
                    >
                      {loader == 'cart' && (
                        <Spinner
                          className="spinnerform"
                          as="span"
                          animation="border"
                          size="sm"
                          role="status"
                          aria-hidden="true"
                        />
                      )}
                      {loader == 'cart' ? 'please wait' : brochureBtn}
                    </Button>
                  </div>
                </div>
                <div className="col-md-5 p-0">
                  <Image
                    className="card-img-top"
                    src={content.brochure_image}
                    width={281}
                    height={197}
                    alt={`${props.title} Image`}
                  />
                </div>
              </div>
            </div>
          </Form>
        )}
      </Formik>
      <Modal className="lead-success-modal" centered show={show}>
        <Modal.Body>
          <div className="container">
            <Image
              src={
                'https://assets.vakilsearch.com/live-images/success_mail.svg'
              }
              width="249px"
              height="197px"
            />
            <h4>
              <b>Brochure sent successfully!</b>
            </h4>
            <h5>
              The requested industry brochure has been successfully sent to the
              selected platform
            </h5>
          </div>

          <Button
            className="info_close_btn"
            onClick={() => {
              handleCloseModal();
            }}
          >
            Close
          </Button>
        </Modal.Body>
      </Modal>

      <Modal className="lead-duplicate-modal" centered show={showModal}>
        <Modal.Body>
          <div className="container">
            <img src="https://assets.vakilsearch.com/live-images/duplicate_img.svg" />
            <h4>
              <b>You’ve reached your maximum limit!</b>
            </h4>
            <h5>
              Looks like you’ve reached the maximum download limit for the
              brochure! For any further queries, please reach us at
              support@vakilsearch.com
            </h5>
          </div>

          <button
            className="info_close_btn"
            onClick={() => {
              handleCloseModal();
            }}
          >
            Close
          </button>
        </Modal.Body>
      </Modal>
    </>
  );
};
export default ServiceBrochureForm;
