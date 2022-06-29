import { AxiosRequestConfig } from "axios";
import { getCookie } from "cookies-next";
import {
  GetServerSideProps,
  GetServerSidePropsContext,
  GetServerSidePropsResult,
} from "next";

import api from "@services/api/client";
import { tryRefreshToken } from "@services/api/refreshToken";

import { authCookieKeys } from "./constants";

export function withAuthRequest<P>(fn: GetServerSideProps<P>) {
  return async (
    ctx: GetServerSidePropsContext
  ): Promise<GetServerSidePropsResult<P>> => {
    const { req, res } = ctx;
    const token = getCookie(authCookieKeys.token, { req, res });

    function addAuthToken(config: AxiosRequestConfig) {
      if (token && config.headers) {
        // eslint-disable-next-line no-param-reassign
        config.headers.Authorization = `Bearer ${token}`;
      }

      return config;
    }

    api.interceptors.request.use(addAuthToken);

    api.interceptors.response.use(
      (response) => response,
      tryRefreshToken({ req, res, instance: api })
    );

    return fn(ctx);
  };
}
