import axios from "axios";

var formValidations = {
  validateEmail: async function (value, validEmail, setValidEmail) {
    let error;
    if (!value) {
      error = "Please enter your email address";
      return error;
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,12}$/i.test(value)) {
      error = "Please enter valid email address";
      return error;
    } else {
      if (!validEmail) {
        var response = await axios(
          window.location.origin + "/static/domain.json"
        );
        if (response.data && response.data.length > 0) {
          var email_val = value;
          var nameMatch = email_val.match(/\.([^.\n\s]*)$/g);
          var email_new_val = nameMatch ? nameMatch[0] : null;
          var filterrecords = response.data.filter(
            (obj) => obj.name === email_new_val.toLowerCase()
          );
          if (filterrecords.length == 0) {
            setValidEmail(false);
            error = "Please enter valid email address";
            return error;
          } else {
            setValidEmail(true);
            return error;
          }
        }
      } else {
        return error;
      }
    }
  },
  validateMobile: function (value) {
    let error;
    var wrg_num = [
      "9999999999",
      "9090909090",
      "8989898989",
      "9898989898",
      "7878787878",
      "6767676767",
      "8888888888",
      "9876543210",
      "6868688668",
      "9999999998",
      "9999999988",
      "9999998888",
      "7777777777",
      "6666666666",
      "9090909998",
      "6868686868",
      "6666677777",
      "9696966999",
    ];
    if (value.length == 10 && wrg_num.includes(value)) {
      error = "Please enter a valid phone number";
      return error;
    }
    if (value.length == 10 && value < 6000000000) {
      error = "Please enter a valid phone number";
      return error;
    } else if (value.length < 10) {
      return "Please enter a valid phone number";
    } else {
      return "";
    }
  },
  setMobileNumberValue: function (name, value, setFieldValue) {
    value = value.replace(/[^0-9]+/g, "");
    if (value.length <= 10) {
      setFieldValue("mobileNumber", value);
    } else if (value.length === 11) {
      value[0] == 0 && setFieldValue(name, value.slice(1, 11));
    } else if (value.length === 12 && value.startsWith("91")) {
      setFieldValue("mobileNumber", value.slice(2));
    }
  },

  setMobileNumberValueDefault: function (value, error, setFieldValue) {
    value = value.replace(/[^0-9]+/g, "");
    if (value.length <= 10) {
      setFieldValue(value);
    } else if (value.length === 11) {
      value[0] == 0 && setFieldValue(value.slice(1, 11));
    } else if (value.length === 12 && value.startsWith("91")) {
      setFieldValue(value.slice(2));
    }
  },

  checkmobile: () =>
    typeof window === "object" &&
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    ),
  validateEmailNew: async function (value, validEmail) {
    let error;

    if (!value) {
      error = {
        msg: "Please enter your email address",
        status: "error",
      };
      return error;
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,12}$/i.test(value)) {
      error = {
        msg: "Please enter valid email address",
        status: "error",
      };
      return error;
    } else {
      if (validEmail == false) {
        await axios({
          url: `${process.env.NEXT_API_BASE_PATH}/emailvalidation`,
          method: "GET",
          params: {
            q: value,
          },
        })
          .then((response) => {
            const status = response.data.status;
            error = {
              msg: status ? response.data : "Please enter valid email address",
              status: status ? "success" : "error",
            };
          })
          .catch(() => {
            error = {
              msg: "Please enter valid email address",
              status: "error",
            };
          });

        return error;
      } else {
        return error;
      }
    }
  },
};
export default formValidations;
