import { readCookie } from "@/utils/helperFunctions";
import mixpanel from "mixpanel-browser";
import { parseCookie } from "./serviceHelperFunction";

mixpanel.init(process?.env?.MIXPANEL_TOKEN);

const getCampaignDetail = (type = "") => {
  const getMixpanelCookieName = `mp_${process?.env?.MIXPANEL_TOKEN}_mixpanel`;
  const getMixpanelCookie = readCookie(getMixpanelCookieName);
  const parsedCookie = parseCookie(
    `${getMixpanelCookieName}=${getMixpanelCookie}`
  );
  const parsedCookieData =
    (parsedCookie && JSON.parse(parsedCookie[getMixpanelCookieName])) || "";
  const { utm_medium = "", utm_source = "" } = parsedCookieData;
  if (type === "object") {
    const returnData = {
      utm_medium: utm_medium || "",
      utm_source: utm_source || "",
    };
    return returnData;
  } else {
    const returnData =
      (utm_medium ? `&utm_medium=${utm_medium}` : "") +
      (utm_source ? `&utm_source=${utm_source}` : "");
    return returnData;
  }
};

const getQueryParam = (url, param) => {
  // Expects a raw URL
  param = param.replace(/[[]/, "[").replace(/[]]/, "]");
  var regexS = "[?&]" + param + "=([^&#]*)",
    regex = new RegExp(regexS),
    results = regex.exec(url);
  if (
    results === null ||
    (results && typeof results[1] !== "string" && results[1].length)
  ) {
    return "";
  } else {
    return decodeURIComponent(results[1]).replace(/\W^-/gi, "");
  }
};

const campaignParams = () => {
  var campaign_keywords =
      "utm_source utm_medium utm_campaign utm_content utm_term".split(" "),
    kw = "",
    params = {},
    first_params = {};
  var index;
  for (index = 0; index < campaign_keywords.length; ++index) {
    kw = getQueryParam(document.URL, campaign_keywords[index]);
    if (kw.length) {
      params[campaign_keywords[index] + " [last touch]"] = kw;
    }
  }
  for (index = 0; index < campaign_keywords.length; ++index) {
    kw = getQueryParam(document.URL, campaign_keywords[index]);
    if (kw.length) {
      first_params[campaign_keywords[index] + " [first touch]"] = kw;
    }
  }
  mixpanel.register(params);
};

const handleMixpanelFunction = (type) => {
  if (type === "grc") {
    if (window?.innerWidth > 768) {
      return "webGRC";
    } else {
      return "mWebGRC";
    }
  } else {
    return "";
  }
};

export const Analytics = {
  identify: (id, type = "") => {
    const mixpanelAccount = handleMixpanelFunction(type);
    campaignParams();
    if (mixpanelAccount) {
      mixpanel[mixpanelAccount]?.identify(id);
    } else {
      mixpanel.identify(id);
    }
  },
  alias: (id, type = "") => {
    const mixpanelAccount = handleMixpanelFunction(type);
    if (mixpanelAccount) {
      mixpanel[mixpanelAccount]?.alias(id);
    } else {
      mixpanel.alias(id);
    }
  },
  track: (name, props, type = "") => {
    return new Promise((resolve, reject) => {
      if (name) {
        const utmParams = getCampaignDetail("object");
        const { utm_medium = "", utm_source = "" } = utmParams;
        props["utmMedium"] = utm_medium;
        props["utmSource"] = utm_source;
        name = name.toLowerCase().replaceAll(" ", "_");
        const mixpanelAccount = handleMixpanelFunction(type);
        if (mixpanelAccount) {
          mixpanel[mixpanelAccount].track(name, props, (response) => {
            if (response.error) {
              reject(response.error);
            } else {
              resolve(response);
            }
          });
        } else {
          mixpanel.track(name, props, (response) => {
            if (response.error) {
              reject(response.error);
            } else {
              resolve(response);
            }
          });
        }
      }
    });
  },
  people: {
    set: (props, type = "") => {
      const mixpanelAccount = handleMixpanelFunction(type);
      if (mixpanelAccount) {
        mixpanel[mixpanelAccount].people.set(props);
      } else {
        mixpanel.people.set(props);
      }
    },
  },
};
