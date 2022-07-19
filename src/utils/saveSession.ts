import { setCookies } from "cookies-next";

import api from "@services/api/client";

import { authCookieKeys } from "./constants";

const oneMonth = 60 * 60 * 24 * 30;
const ondeDay = 60 * 60 * 24;
const oneHour = 60 * 60;
const oneMinute = 60;


export function saveSession({
  token,
  refreshToken,
}) {
  const ttl = 5 * oneMinute;

  setCookies(authCookieKeys.token, token, {
    maxAge: ttl,
  });

  setCookies(authCookieKeys.refresh, refreshToken, {
    maxAge: ttl,
  });

  api.defaults.headers.common.Authorization = `Bearer ${token}`;
}
