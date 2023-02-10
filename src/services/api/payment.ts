import { authCookieKeys } from "@utils/constants";
import { getCookie } from "cookies-next";

import api from "@services/api/client";

import { gyns } from "../GymManager";

export const AddPayment = async (userId, value, date) => {
  const gym = gyns.find((x) => x.isDefault);

  try {
    const url = `/Payment/Gym/${gym.id}/Activity/${gym.activityId}/user/${userId}`;
    const token = getCookie(authCookieKeys.token);

    const request = await api.post(
      url,
      {
        Value: value,
        Date: date,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return request;
  } catch (error) {
    // console.log("########### error ############ ", error);
    return error.response;
  }
};

export const GetAll = async () => {
  const gym = gyns.find((x) => x.isDefault);

  try {
    const url = `/Payment/Gym/${gym.id}/Activity/${gym.activityId}`;
    const token = getCookie(authCookieKeys.token);

    const response = await api.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // console.log("$$$$$$$$$$$$$$ ", response.data);
    return response;
  } catch (error) {
    // console.log("########### error ############ ",error );
    return error.response;
  }
};
