import { authCookieKeys } from "@utils/constants";
import { getCookie } from "cookies-next";

import api from "@services/api/client";

import { gyns } from "../GymManager";

export const GetInfo = async () => {
  const gym = gyns.find((x) => x.isDefault);

  try {
    const url = `/gym/${gym.id}/activity/${gym.activityId}`;
    const token = getCookie(authCookieKeys.token);

    const response = await api.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    // console.log("########### error ############ ", error);
    return error.response;
  }
};
