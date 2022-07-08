import { authCookieKeys } from "@utils/constants";
import { getCookie } from "cookies-next";

import { User } from "types";
import api from "../client";

export async function me(): Promise<User> {

  const refresToken = getCookie(authCookieKeys.refresh);

  const {
    data: { client },
  } = await api.post("/Session/ByRefreshToken", {refreshToken:refresToken});

  return {
    id: client.id,
    userName: client.userName,
    name: client.name,
    email: client.email,
    lastName: client.lastName,
    userRoles: client.user,
    birthDate: client.birthDate,
    image: client.image,
    phoneNumber: client.phoneNumber,
    active: client.active
  };
}
