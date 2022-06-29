import { authCookieKeys } from "@utils/constants";
import { AxiosError } from "axios";
import { getCookie, setCookies } from "cookies-next";

import api from "./client";

let refreshing = false;
let requestQueue = [];

export function tryRefreshToken({ req, res, instance }) {
  // eslint-disable-next-line consistent-return
  return (error: AxiosError) => {
    if (error.response.status === 401) {
      if (!refreshing) {
        const originalConfig = error.config;
        return new Promise((resolve, reject) => {
          requestQueue.push({
            onSuccess: (token: string) => {
              originalConfig.headers.Authorization = `Bearer ${token}`;
              resolve(instance(originalConfig));
            },
            onError: (reqError: AxiosError) => {
              reject(reqError);
            },
          });
        });
      }

      refreshing = true;
      const refreshToken = getCookie(authCookieKeys.refresh, { req, res });
      if (!refreshToken) {
        return Promise.reject(error);
      }
      api
        .patch("/users/session", { refresh_token: refreshToken })
        .then((response) => {
          const {
            token: {
              token,
              refreshToken: { newRefreshToken },
            },
          } = response.data;

          setCookies(authCookieKeys.refresh, newRefreshToken, {
            maxAge: 60 * 60 * 24 * 30, // 1 month
            req,
            res,
          });

          setCookies(authCookieKeys.token, token, {
            maxAge: 60 * 60 * 24 * 30, // 1 month
            req,
            res,
          });

          api.defaults.headers.common.Authorization = `Bearer ${token}`;

          requestQueue.forEach((request) => request.onSuccess());
        })
        .catch((err) => {
          requestQueue.forEach((request) => request.onError(err));
        })
        .finally(() => {
          refreshing = false;
          requestQueue = [];
        });
    }
  };
}
