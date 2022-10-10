import { authCookieKeys } from "@utils/constants";
import axios, { AxiosRequestConfig } from "axios";
import { getCookie } from "cookies-next";

const token = getCookie(authCookieKeys.token);

const api = axios.create({
  // baseURL: "https://inovaideia.net.br/api",
  baseURL: "http://192.168.15.67:5001/api",
});

function addAuthToken(config: AxiosRequestConfig) {
  if (token && config.headers) {
    // eslint-disable-next-line no-param-reassign
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
}

api.interceptors.request.use(addAuthToken);

export default api;
