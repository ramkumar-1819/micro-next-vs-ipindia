export const encodeData = (serviceId) => {
  let token = { serviceId: serviceId };
  if (typeof window !== "undefined") {
    console.log(window.btoa(JSON.stringify(token)));
    return window.btoa(JSON.stringify(token));
  }
};
