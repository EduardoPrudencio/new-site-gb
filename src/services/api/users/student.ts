import { authCookieKeys } from "@utils/constants";
import { getCookie } from "cookies-next";
import { Student } from "types";

import api from "../client";

export async function add(): Promise<Student> {
  const refresToken = getCookie(authCookieKeys.refresh);

  const {
    data: { client },
  } = await api.post("/user/Activity/{activityId}/Gym/{gymId}", {
    refreshToken: refresToken,
  });

  //   return {
  //     id: client.id,
  //     userName: client.userName,
  //     name: client.name,
  //     email: client.email,
  //     lastName: client.lastName,
  //     userRoles: client.userRoles,
  //     birthDate: client.birthDate,
  //     image: client.image,
  //     phoneNumber: client.phoneNumber,
  //     active: client.active,
  //     //isAdministrator: client.userRoles.contains("administrator")
  //     isAdministrator: true
  //   };
}
