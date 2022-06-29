import { setCookies } from "cookies-next";

import api from "@services/api/client";

import { authCookieKeys } from "./constants";

export function saveSession({
  token,
  refreshToken,
  newspaperPermission,
  magazinePermission,
}) {
  const ttl = 60 * 60 * 24 * 30; // 1 month

  setCookies(authCookieKeys.token, token, {
    maxAge: ttl, // 1 month
  });

  setCookies(authCookieKeys.refresh, refreshToken, {
    maxAge: ttl, // 1 month
  });

  setCookies("newspaperPermission", newspaperPermission, {
    maxAge: ttl, // 1 month
  });

  setCookies("magazinePermission", magazinePermission, {
    maxAge: ttl, // 1 month
  });

  api.defaults.headers.common.Authorization = `Bearer ${token}`;
}
