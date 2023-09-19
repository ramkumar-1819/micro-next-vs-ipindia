import axios from 'axios';

export const readCookie = function (name) {
    var nameEQ = name + '=';
    var ca = typeof window == 'object' ? document.cookie.split(';') : '';
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  };

export const eventTracking = (
  ticketDetails,
  screenName,
  workflow,
  event,
  eventName,
  customEventLabel,
  customEventValue,
) => {
  const getBasicDetails = {
    workflow: readCookie('workflow')
      ? (ticketDetails?.service_id == 78 || ticketDetails?.service_id == 248) &&
        readCookie('workflow')
      : workflow,

    screenName: screenName,
    eventTime: +new Date(),
    ticketId: ticketDetails?.ticketid,
    serviceId: ticketDetails?.service_id,
    url: window.location.href,
    _ga: readCookie('_ga'),
    userAgent: navigator.userAgent,
    platform: 'website',
    version: 'default',
    // ...((gstExpt || selectedVersion) && {
    //   version: selectedVersion || `gst_doc_collection_after_payment`,
    // }),
  };

  // console.info('values: ', values);

  const payloadNew = {
    ...getBasicDetails,
    eventName: eventName,
    event: event,
    ...(customEventLabel &&
      customEventValue && {
        eventProperties: {
          label: customEventLabel,
          value: customEventValue,
        },
      }),
  };
  // console.info('payment selection: ', payloadNew);
  // eventTrackCall(eventTrackObj);
  eventTrackNew(payloadNew);
};

const eventTrackNew = async (data) => {
  await axios({
    url: '/api/event-track',
    method: 'POST',
    data,
  }).catch((err) => console.log(err));
};

export const getAltText = (text) => {
  return text.replaceAll(/\/|\.[a-z]{3}$/g, "").replaceAll(/\-|\_/g, " ");
};