/* Please maintain the imports in a tree structure
with the length of the smallest import at the top and the biggest at the bottom */

// NPM Imports
import axios from 'axios';
import Router from 'next/router';
import {
  leadQualficationServiceId,
  onboardingEntityServices,
} from '@utils/constants';
import { isMobile } from 'react-device-detect';
import {
  GstExperiment,
  setGSTWorkflow,
  setTMWorkflow,
  TMExperiment,
  fetchSource,
  GSTPaymentExperiment,
  GstOnboadingExperiment,
  GstOnboadingExperimentMWeb,
  eventRequest,
  initExperiment,
  IncOnboardingExperiment,
  IncOnboardingSubExperiment,
  onboardingRedirectionTrack,
} from '../bridge/functions/Experiment';
import { growthBookInit } from '../bridge/functions/GrowthBook';
import {
  createMoengageUser,
  leadSuccessEvent,
  moengageEventTracking,
} from './MoengageTrackingFunctions';
import { fetchOnboardingEntityStatus } from './onboarding';

// File Imports
import ptlLeadCreation from './ptlseamlessintegration';
import ptlSeamLessIntegration from './ptlseamlessintegration';
import {
  checkCookieExists,
  deleteCookie,
  readCookie,
  setCookie,
} from './servicepagefunctions';
import { Analytics } from 'bridge/functions/analytics';
import {
  BUNDLE_PARTNER_EXPERIMENTS,
  FEATURE_NAME,
  FEATURE_SUB_NAME,
  GST_ONBOARDING_VARIATION,
  VS_GST_MWEB,
  VS_GST_WEB,
  GST_VARIATION,
  FEATURE_SUB_NAME_PVT,
  FEATURE_NAME_PVT,
} from 'bridge/functions/data/Experiments';
import { handleNoteContent } from './handleAddNotes';
import { moengageScriptServiceId } from './constants';
import { getLoginType } from './getLoginType';
import { getTempWorkflows } from '@components/NewOnboarding/Bundles/functions';

// COnstant variables.
const businessInfoRedirections = [
  '1',
  '3',
  '4',
  '78',
  '248',
  '110',
  '361',
  '228',
  '331',
  '330',
  '111',
  '106',
  '114',
  '22',
  '199',
];
export const onBoardingRedirection = [
  '248',
  '78',
  '110',
  '361',
  '228',
  '331',
  '330',
  '111',
  '106',
  '114',
  '22',
  '199',
];
const newOnboardingIds = [
  '110',
  '361',
  '228',
  '331',
  '330',
  '111',
  '106',
  '114',
  '22',
  '199',
];

const notBusinessInfoRedirections = [
  'online-gst-registration-b',
  'online-gst-registration-a',
  'online-company-registration-b',
];
const checkoutPageRedirections = ['online-company-registration-b'];

const handleAddNotes = (data) => {
  axios({
    url: `/api/add-note`,
    method: 'POST',
    data,
  })
    .then((res) => {})
    .catch((err) => {
      console.log('error', err);
    });
};

const handleAddDataInRedis = (data) => {
  axios({
    url: `/api/redis-data`,
    method: 'post',
    data,
  })
    .then((res) => {
      return 'Success';
    })
    .catch((fail) => {
      console.info('fail: ', fail);
    });
};

const handleTrafficSplitUp = async (values, id) => {
  const { serviceId, workflow, channel } = values;
  if (serviceId == 248) {
    await GstOnboadingExperiment(id, VS_GST_WEB);
    await leadSuccessEvent(
      serviceId,
      workflow,
      '',
      channel,
      'lead_form_cta_clicked',
    );
  }
};

const thankyouRedirection = async (thank_you_magic_key, email) => {
  return thank_you_magic_key
    ? Router.push(`/thank-you?k=${thank_you_magic_key}`)
    : Router.push(`/thank-you?email=${email}`, `/thank-you`);
};

const serviceBasedRedirection = async (serviceId, email, magickey) => {
  /**Razorpay redirection */
  if (serviceId == 855)
    Router.push(
      `/pre-checkout-rgp?k=${magickey}&email=${email}`,
      `/pre-checkout-rgp?k=${magickey}`,
    );
  /** Talk to lawyer Verification */
  if (serviceId == '738')
    Router.push(
      `/talk-to-lawyer-verification?k=${magickey}&pt=Agreements & Documentation`,
    );
};

const onboardingServiceIntegration = async (magic_key) => {
  const onboardingCookieExist = readCookie('onboardingExistingUser');
  try {
    const { data } = await fetchOnboardingEntityStatus({
      magic_key: magic_key?.replace('-', ''),
      is_onboarding: true,
    });
    data?.is_entity_exists
      ? setCookie('onboardingExistingUser', true)
      : onboardingCookieExist && deleteCookie('onboardingExistingUser');
  } catch (err) {
    !onboardingCookieExist && setCookie('onboardingExistingUser', true);
    console.log('Entity checking error ocurred', err);
  }
  return;
};

const ptlRequest = async (isPTLService, serviceId, magickey, workflow) => {
  if (
    !['248', '3'].includes(serviceId) &&
    isPTLService &&
    !window.location.pathname.includes('online-trademark-registration') &&
    !window.location.pathname.includes('trademark-registration-self') &&
    !workflow
  ) {
    await axiosRequests.apiGetQuotationDetails(magickey, () => {});
  }
};

const handleTMExperiment = async (ticketObj) => {
  const { workflow, workflowName, magickey, values, ticketId } = ticketObj;
  Router.push(`/onboarding-v1?k=${magickey}`);
  if (workflowName && workflow != null) {
    setTMWorkflow(workflow, magickey, values);
  } else {
    // TMExperiment(magickey, values, ticketId);
  }
};

const handleNewOnboardingRoutes = async (ticketObj) => {
  const { workflow, workflowName, magickey, values, ticketId, serviceId } =
    ticketObj;
  const Currentworkflow = readCookie('workflow');
  if (workflow === null) {
    setCookie('workflow', getTempWorkflows(serviceId));
  }
  return Router.push(`/onboarding-v1?k=${magickey}`);
};

const handleRedirections = async (ticketObj) => {
  const { serviceId, url, magickey, values, ticket } = ticketObj;
  const workflow = readCookie(FEATURE_SUB_NAME) || (ticketObj?.workflow ?? '');
  const { page_name } = values;
  const ignoreAddNoteServiceIds = [
    '78',
    '106',
    '110',
    '361',
    '228',
    '330',
    '331',
    '111',
    '22',
    '114',
    '199'
  ];
  if (
    businessInfoRedirections.includes(serviceId) &&
    !notBusinessInfoRedirections.includes(url)
  ) {
    /**Service GST */

    if (onBoardingRedirection.includes(serviceId)) {
      const addNotePayload = {
        ticket_id: ticketObj?.ticketId,
        subject: 'Customer Viewed Price',
        content: handleNoteContent(workflow),
      };
      {
        !ignoreAddNoteServiceIds.includes(serviceId) &&
          handleAddNotes(addNotePayload);
      }
      await handleOnboardingServiceFlow(ticketObj);
    } else {
      if (newOnboardingIds.includes(serviceId)) {
        handleNewOnboardingRoutes(ticketObj);
      } else if (serviceId == 78) {
        handleTMExperiment(ticketObj);
      } else {
        handleIncorporationExperiment(ticketObj);
      }
    }
  } else if (leadQualficationServiceId.includes(+serviceId)) {
    //lead qualification flow
    Router.push(`/lead-qualification?k=${magickey}`);
  } else if (checkoutPageRedirections.includes(url)) {
    Router.push(`/checkout?k=${magickey}`);
  } else if (
    process.env.PAYMENT_MICRO_SITE_SERVICE_IDS.includes(Number(serviceId))
  ) {
    await handleMicroSiteRoutes(ticketObj);
  } else {
    initExperiment(values, ticket);
    Router.push(`/cart?k=${magickey}`);
  }
};

const handleIncorporationExperiment = async (ticketObj) => {
  const { uuid, values, ticketId, ticket, magickey, userData } = ticketObj;

  const isIncExperiment = await IncOnboardingExperiment(uuid, values, ticketId);
  if (isIncExperiment) {
    if (isIncExperiment == 'PVT_GRC' || isIncExperiment == 'PARTNER_BENEFITS') {
      Analytics.identify(uuid);
      Analytics.people.set(userData);
      await Analytics.track('incorporation_login', {
        ...ticketObj,
        workflow: readCookie(FEATURE_NAME_PVT),
      });
      Router.push(`/onboarding-v1?k=${magickey}`);
    } else {
      Router.push(`/pre-checkout?k=${magickey}`);
    }
  }
};

export const handleMicroSiteRoutes = async (ticketObj) => {
  const { uuid, values, ticketId } = ticketObj;
  const { payment_request_id, workflow, serviceId } = values;
  const redisPayload = {
    uuid,
    ticket: {
      _ga: readCookie('_ga'),
      id: ticketId,
      hash: payment_request_id,
      workflow,
      serviceId,
    },
  };
  await handleAddDataInRedis(redisPayload);
  setTimeout(() => {
    window.location.assign(
      `${process.env.PAYMENT_MICRO_SITE}/vs/checkout?k=${payment_request_id}`,
    );
  }, 500);
};

const handleOnboardingServiceFlow = async (ticketObj) => {
  const {
    serviceId,
    screen_url,
    workflow,
    workflowName,
    uuid,
    values,
    ticket,
    userData,
    magickey,
    ticketId,
  } = ticketObj;
  const { channel_opt_in, city, email, mobileNumber } = values;
  const { ticket_magic_key } = ticket;

  const version = readCookie(FEATURE_NAME);
  const data = {
    ...ticketObj,
    version,
    workflow: readCookie(FEATURE_SUB_NAME),
  };

  const serviceBasedEventName = getLoginType(serviceId);
  // user creation in  moengage.
  const moengageUserCreation = () =>
    new Promise(function (myResolve) {
      setTimeout(() => {
        createMoengageUser(
          email,
          mobileNumber,
          city?.label,
          uuid,
          channel_opt_in,
        );
        moengageEventTracking({
          eventName: serviceBasedEventName,
          props: data,
        });
        myResolve();
      }, 100);
    });
  // if (serviceId == 248) {
  Analytics.identify(uuid);
  Analytics?.people.set(userData);
  await Analytics.track(serviceBasedEventName, {
    ...data,
  });
  if (moengageScriptServiceId.includes(+serviceId)) {
    await moengageUserCreation();
  }
  if (serviceId == 248 && workflowName && workflow != null && screen_url) {
    Router.push(screen_url);
  } else {
    onboardingRedirectionTrack(ticket, 'grc-onboarding');
    /* Redirect to GRC,Bundle */
    if (version !== 'pre-checkout') {
      if (GST_VARIATION.includes(version)) {
        setCookie('user_uuid', uuid);
      }
      Router.push(`/onboarding-v1?k=${magickey || ticket_magic_key}`);
    } else if (version === 'pre-checkout') {
      /* Redirect to pre-checkout */
      setCookie('workflow', 'gst-onboarding');
      Router.push(`/pre-checkout?k=${magickey || ticket_magic_key}`);
    } else {
      Router.push(`/onboarding-v1?k=${magickey || ticket_magic_key}`);
      setCookie('workflow', 'gst-onboarding');
    }
  }
};

var axiosRequests = {
  apiCreateTicket: async (
    values,
    isPTLService,
    utmMedium,
    callback,
    returnData = false,
    checkStatus = false,
  ) => {
    //lowercase email address.
    values = { ...values, email: values?.email.toLowerCase() };
    axios({
      url: `/api/create-lead`,
      method: 'post',
      data: {
        values,
        gst_onboard: values.serviceId == 248 ? true : undefined,
      },
    })
      .then(async (res) => {
        const ticket = res.data.ticket;
        const { id, service_id } = ticket;
        const ticket_id = id;
        /** This function is using for attributing data in tag manager */
        window.dataLayer.push({
          event: 'lead_created',
          conversion_data: {
            ticketId: id,
            email: values.email,
            serviceId: service_id,
          },
        });
        //** End */
        if (
          ticket?.service_id == 248 &&
          ticket?.is_paid == true &&
          ticket?.onboard_url
        ) {
          return (window.location.href = ticket?.onboard_url);
        }

        await handleTrafficSplitUp(values, id);
        const uuid = ticket?.user_uuid;
        const prid = values?.payment_request_id;
        const {
          addNote,
          userDetails,
          channel,
          channel_opt_in,
          mobileNumber,
          email,
          city,
          workflow,
          serviceId,
        } = values;
        eventRequest(values, ticket_id);
        /* Ticket Details update for pay-way */
        process.env.PAYMENT_MICRO_SITE_SERVICE_IDS.includes(+serviceId) &&
          (await axiosRequests?.updatePostPaymentDetails(
            uuid,
            prid,
            ticket_id,
            serviceId,
          ));
        addNote &&
          axiosRequests.addTicketNote({ ticket_id, message: addNote.message });
        if (checkStatus && res?.data?.ticket?.is_paid) {
          //redirection_url
          return callback(res?.data);
        }
        if (returnData) {
          callback && res?.data && callback(res?.data);
        } else {
          axiosRequests.funcAfterLeadCreation(
            res.data,
            values,
            utmMedium,
            isPTLService,
            callback,
            uuid,
            userDetails,
          );
        }
        ticket_id &&
          leadSuccessEvent(
            res.data.ticket.service_id,
            workflow,
            ticket_id,
            channel,
          );
        setCookie('user_uuid', uuid);
      })
      .catch((fail) => {
        console.info('fail: ', fail);
      });
  },
  apiDecryptTicketDetails: (ticketDecryption, callback) => {
    axios({
      url: `/api/ticket-decryption`,
      method: 'get',
      params: {
        encryptKey: ticketDecryption,
      },
    })
      .then((res) => {
        const data = res.data.data;
        callback(data);
      })
      .catch((fail) => {
        console.info('fail: ', fail);
      });
  },
  apiDecryptMagicKey: (encryptKey, callback) => {
    axios({
      url: `/api/magickey-decryption`,
      method: 'get',
      params: {
        encryptKey,
        url: window.location.href ?? '',
      },
    })
      .then((res) => {
        const data = res.data.data;
        callback(data);
      })
      .catch((fail) => {
        console.info('fail: ', fail);
      });
  },
  apiSegmentEventTrack: (segTrackObj, callback) => {
    const { userId, event, properties } = segTrackObj;
    axios({
      url: 'https://api.segment.io/v1/track',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      auth: {
        username: process.env.SEGMENT_WRITE_KEY + ':',
        password: '',
      },
      data: {
        userId,
        event,
        properties,
        context: {
          userAgent: navigator.userAgent,
        },
      },
    })
      .then((res) => {
        callback(res?.data?.success);
      })
      .catch((fail) => {
        callback(false);
        console.error('fail: ', fail);
      });
  },
  otpSendVerification: (
    old_mobile_number,
    mobile_number,
    otp,
    callback,
    ticketid,
  ) => {
    axios({
      url: '/api/otp_send_verify',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: {
        old_mobile_number:
          old_mobile_number !== mobile_number ? old_mobile_number : '',
        mobile_number,
        otp,
        ticketId: ticketid,
      },
    })
      .then((res) => {
        callback && callback(res.data?.success);
      })
      .catch(() => {
        callback && callback(false);
      });
  },
  apiGetPriceDetails: (
    hashKey,
    data,
    callback,
    isOnBoarding = false,
    // makeInIndia,
  ) => {
    axios({
      url: `/api/get-price-details`,
      method: 'post',
      data: {
        hashKey,
        data,
        onboarding: isOnBoarding,
        gst_onboard: isOnBoarding,
        // make_in_india_coupon: checkCookieExists('gst-discount-pricing')
        //   ? true
        //   : undefined,
      },
    })
      .then((res) => {
        callback(res.data.data);
      })
      .catch((fail) => {
        console.info('fail: ', fail);
      });
  },

  apiGetQuotationDetails: async (
    hashKey,
    callback,
    quotationDetails = false,
    onboarding = false,
    make_in_india_coupon,
    paymentMode = '',
    advance_payment = false,
  ) => {
    await axios({
      url: `/api/get-quotation-details`,
      method: 'post',
      data: {
        user_key: hashKey,
        ...(quotationDetails && {
          data: {
            ...quotationDetails,
          },
        }),
        onboarding,
        make_in_india_coupon,
        payment_mode: paymentMode,
        advance_payment:
          advance_payment ?? quotationDetails?.experiment === '500_payment'
            ? !advance_payment
            : advance_payment,
      },
    })
      .then((res) => {
        callback(res.data);
      })
      .catch((fail) => {
        callback(fail);
        console.info('fail: ', fail);
      });
  },

  apiCreateInternalMessage: (ticketObj, messageContent) => {
    axios({
      url: `/api/create-internal-message`,
      method: 'post',
      data: {
        is_private: true,
        email_id: ticketObj.email,
        ticket_id: ticketObj.id,
        template: messageContent,
      },
    })
      .then((res) => {
        console.info('Ticket message created!');
      })
      .catch((fail) => {
        console.info('fail: ', fail);
      });
  },
  apiBrochureLeadCreation: (values, callback) => {
    const utmMedium = 'service';
    const isPTLService = true;
    axios({
      url: `/api/brochure-lead-creation`,
      method: 'post',
      data: {
        channel: 'service_form_brochure',
        email: values.email,
        mobile_number: values.mobileNumber,
        industry_type: values.industry_type,
        whatsapp_brochure: values.whatsapp_brochure,
      },
    })
      .then((res) => {
        callback(res.data);
        console.info('Brochure lead created!');
        axiosRequests.funcAfterBrochureLeadCreation(
          res.data,
          values,
          utmMedium,
          isPTLService,
        );
      })
      .catch((fail) => {
        console.info('fail: ', fail);
      });
  },

  // ----------------------- API Requests Above this line ----------------------- //
  // ----------------------- Method Functions below this line ------------------- //

  funcAfterLeadCreation: async (
    data,
    values,
    utmMedium,
    isPTLService,
    callback,
    uuid = '',
    userDetails,
  ) => {
    const {
      isThankYou,
      email,
      mobileNumber,
      city,
      submitRoute,
      serviceId,
      url,
    } = values;
    const { ticket = {} } = data;
    const { thank_you_magic_key, screen_url, workflow, user_uuid } = ticket;
    const magickey = ticket?.ticket_magic_key;
    const ticketId = ticket?.id;
    const workflowName = ticket?.hasOwnProperty('workflow');
    let userData = {
      $userId: user_uuid,
      $email: email,
      $phone: mobileNumber,
      $state: city?.label || 'Other cities',
      $ticketId: ticketId,
    };
    const ticketObj = {
      serviceId,
      screen_url,
      workflow,
      workflowName,
      uuid,
      values,
      ticket,
      userData,
      magickey,
      ticketId,
      ticket,
    };
    ticketId &&
      ptlLeadCreation.callUserTrack(
        values,
        ticketId,
        utmMedium || '',
        isPTLService,
        userDetails,
      );
    // setting/removing onboarding cookie for entity.
    onboardingEntityServices.includes(+serviceId) &&
      (await onboardingServiceIntegration(magickey));
    callback && callback({ ticket });
    if (isThankYou) {
      await thankyouRedirection(thank_you_magic_key, email);
    } else {
      if (submitRoute) return Router.push(`/${submitRoute}?k=${magickey}`);
      await serviceBasedRedirection(serviceId, email, magickey);
      await handleRedirections(ticketObj);
    }
  },

  //Calling userTrack after Brochure lead creation
  funcAfterBrochureLeadCreation: (data, values, isPTLService) => {
    const { ticket_id } = data;
    const ticketId = ticket_id || '';
    const utmMedium = utmMedium || '';
    ticketId &&
      ptlSeamLessIntegration.callUserTrack(
        values,
        ticketId,
        utmMedium,
        isPTLService,
      );
  },
  apiGetUserTrackDetails: async (ticketId) => {
    try {
      const response = await axios.get(
        `${process.env.SOURCE_TRACK_URL}/${ticketId}/source`,
      );
      return response.data;
    } catch (error) {
      return {};
    }
  },
  postPaymentDetails: async (data, cb) => {
    const { serviceId } = data;
    const url = process.env.PAYMENT_MICRO_SITE_NEW_SERVICE_IDS.includes(
      +serviceId,
    )
      ? `/api/pay/payment-request`
      : `/api/pay/post-details`;
    axios({
      url,
      method: 'POST',
      data,
    })
      .then((res) => {
        const prid = res?.data?.prid || res?.data?.paymentRequestID;
        console.log('REQUEST REQUEST', res?.data);
        setCookie('PRID', prid);
        if (res?.data) {
          res.data.prid = prid;
        }
        if (cb) {
          cb(res);
        } else {
          return res;
        }
      })
      .catch((err) => console.log('fail', err));
  },
  updatePostPaymentDetails: async (uuid, prid, ticketId, serviceId) => {
    return axios({
      url: process.env.PAYMENT_MICRO_SITE_NEW_SERVICE_IDS.includes(+serviceId)
        ? `/api/pay/payment-request`
        : `/api/pay/post-details`,
      method: 'PUT',
      data: {
        uuid,
        ticketId,
      },
      params: { prid, type: 'ticket' },
    })
      .then((res) => {
        return 'Updated Successfully';
      })
      .catch((err) => console.log('fail', err));
  },
  updatePaymentPriceDetails: async (data, prid, cb) => {
    axios({
      url: `/api/pay/payment-request`,
      method: 'PUT',
      data,
      params: { prid, type: 'price' },
    })
      .then((res) => {
        cb?.(res);
        return 'Updated Successfully';
      })
      .catch((err) => console.log('fail', err));
  },
  addTicketNote: async ({ ticket_id, message }) => {
    axios({
      url: `/api/add-note`,
      method: 'post',
      data: {
        ticket_id,
        subject: 'add_note',
        content: message,
      },
    }).catch((fail) => {
      console.info('fail: ', fail);
    });
  },
  handleLeadCreation: async (data) => {
    return await axios({
      url: `/api/create-lead`,
      method: 'POST',
      data: {
        values: data,
      },
    })
      .then((res) => {
        return res?.data;
      })
      .catch((err) => {
        console.log('error', err);
        return err;
      });
  },
};

export default axiosRequests;

export const apiGetPriceDetailsSSR = async (
  hashKey,
  data = '',
  isOnBoarding = false,
) => {
  return await axios({
    url: `${process.env.API_URL}get_pricing_detail/${hashKey}`,
    method: 'post',
    headers: {
      'X-Requested-With': 'XMLHttpRequest',
      'Content-Type': 'application/json',
      key: 'e7e7a52397d57a5cd126328db7793009',
      token: 'tPiz9vb0vGxATzEEsNciEsPf9GRNcNp6',
    },
    data: {
      data,
      onboarding: isOnBoarding,
      gst_onboard: isOnBoarding,
      couponCode: '',
    },
  })
    .then((res) => {
      return res.data.data;
    })
    .catch((fail) => {
      console.info('fail: ', fail);
    });
};
