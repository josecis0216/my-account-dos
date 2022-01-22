/* eslint-disable */
import router from "@/routes/routes";
import axios from "axios";

let instance = axios.create({
  headers: {
    // Authorization:
    //     process.env.NODE_ENV === "development"
    //         ? `Bearer ${process.env.VUE_APP_BEARER_TOKEN}`
    //         : `Bearer ${envData.apiKey}`,
    Authorization:
      "Bearer IQWhCB9IZG8wrAiHHEioiAblu7w1Iri2dUSJaW2tDteN0UWiwNI17lSIg7OD"
    // Authorization:
    //   "Bearer v39G6zGRzoAKTGaV1hpn9qRsJ7Z1emMv4lhybHbZVlRxvfMTmCcGOsvd6L8V"
  },
  baseURL: "https://dev-gabbid.gabbcloud.com/api",
  // baseURL: "https://gapi-stage.gabbwireless.com/api",
  // baseURL:
  //     process.env.NODE_ENV === "development"
  //         ? process.env.VUE_APP_API
  //         : envData.apiUrl,
  timeout: 20000,
  params: {}
});

instance.interceptors.request.use(function(req) {
  if (req.url.includes("accessories") || req.url.includes("product")) {
    req.url = "/1" + req.url;
  }
  return req;
});

instance.interceptors.response.use(function(res) {
  if (res.data.status === "error") {
    if (res.data.message === "You are not currently logged in") {
      router.push("/login").catch(e => e);
    }
  } else if (res.data.code === 500) {
    router.push("/login").catch(e => e);
  }
  return res;
});

export default instance;
/* eslint-enable */
