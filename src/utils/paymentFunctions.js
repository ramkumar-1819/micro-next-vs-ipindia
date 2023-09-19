import axios from "axios";

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