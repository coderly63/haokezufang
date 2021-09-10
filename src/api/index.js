import axios from "axios";
// import { Toast } from "antd-mobile";

import config from "../config";

// function loadingToast() {
//   Toast.loading("Loading...", 0);
// }

const instance = axios.create({
  timeout: 20000,
  baseURL: config.baseURL,
});
instance.interceptors.request.use((config) => {
  // loadingToast();
  return config;
});
instance.interceptors.response.use((response) => {
  // Toast.hide();
  return response.data;
});

export default instance;
