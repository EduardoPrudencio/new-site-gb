import { authCookieKeys } from "@utils/constants";
import { getCookie } from "cookies-next";

import api from "@services/api/client";

import { gyns } from "../GymManager";

export const Add = async (values) => {
  const gym = gyns.find((x) => x.isDefault);

  try {
    const url = `/user/Activity/${gym.activityId}/Gym/${gym.id}`;
    const token = getCookie(authCookieKeys.token);

    const response = await api.post(
      url,
      {
        name: values.name,
        lastName: values.lastname,
        userName: values.username,
        phoneNumber: values.phonenumber,
        birthDate: values.birthdate,
        email: values.email,
        password: values.password,
        address: {
          endereco: values.address,
          numero: values.number,
          complemento: values.complemento,
          cidade: values.cidade,
          bairro: values.bairro,
          uf: values.uf,
          cep: values.cep,
        },
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
  } catch (error) {
    // console.log("########### error ############ ",error );
    return error.response;
  }
};

export const Update = async (values) => {
  const gym = gyns.find((x) => x.isDefault);

  try {
    const url = `/user/Gym/${gym.id}`;
    const token = getCookie(authCookieKeys.token);

    const response = await api.put(
      url,
      {
        id: values.id,
        name: values.name,
        lastName: values.lastname,
        userName: values.username,
        phoneNumber: values.phonenumber,
        birthDate: values.birthdate,
        email: values.email,
        password: "******",
        address: {
          endereco: values.address,
          numero: values.number,
          complemento: values.complemento,
          cidade: values.cidade,
          bairro: values.bairro,
          uf: values.uf,
          cep: values.cep,
        },
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
  } catch (error) {
    // console.log("########### error ############ ",error );
    return error.response;
  }
};

export const GetAll = async () => {
  const gym = gyns.find((x) => x.isDefault);

  try {
    const url = `/Gym/${gym.id}/Activity/${gym.activityId}/users`;
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

export const GetById = async (userId) => {
  const gym = gyns.find((x) => x.isDefault);

  try {
    const url = `/user/${userId}/activity/${gym.activityId}/gym/${gym.id}
    `;
    const token = getCookie(authCookieKeys.token);

    const { data } = await api.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return data.data;
  } catch (error) {
    // console.log("########### error ############ ", error);
    return error.response;
  }
};

export const RequestPresence = async (userId) => {
  const gym = gyns.find((x) => x.isDefault);

  try {
    const url = `/user/${userId}/activity/${gym.activityId}/gym/${gym.id}/requet-presence`;
    const token = getCookie(authCookieKeys.token);

    const request = await api.put(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return { data: request.data, statusCode: request.status };
  } catch (error) {
    // console.log("########### error ############ ", error);
    return error.response;
  }
};

export const GetAllPresences = async () => {
  const gym = gyns.find((x) => x.isDefault);

  try {
    const url = `/user/activity/${gym.activityId}/gym/${gym.id}/presences`;
    const token = getCookie(authCookieKeys.token);

    const request = await api.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return { data: request.data, statusCode: request.status };
  } catch (error) {
    // console.log("########### error ############ ", error);
    return error.response;
  }
};

export const ConfirmPresence = async (userId, presenceId) => {
  const gym = gyns.find((x) => x.isDefault);

  try {
    const url = `/user/${userId}/activity/${gym.activityId}/gym/${gym.id}/confirm-presence/${presenceId}`;
    const token = getCookie(authCookieKeys.token);

    const request = await api.put(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return { data: request.data, statusCode: request.status };
  } catch (error) {
    // console.log("########### error ############ ", error);
    return error.response;
  }
};

export const RefusePresence = async (userId, presenceId) => {
  const gym = gyns.find((x) => x.isDefault);

  try {
    const url = `/user/${userId}/activity/${gym.activityId}/gym/${gym.id}/refuse-presence/${presenceId}`;
    const token = getCookie(authCookieKeys.token);

    const request = await api.put(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return { data: request.data, statusCode: request.status };
  } catch (error) {
    // console.log("########### error ############ ", error);
    return error.response;
  }
};


export const AddLevel = async (userId, level) => {
  const gym = gyns.find((x) => x.isDefault);

  try {
    const url = `/user/${userId}/activity/${gym.activityId}/gym/${gym.id}/setlevel/${level}`;
    const token = getCookie(authCookieKeys.token);

    const request = await api.put(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return { data: request.data, statusCode: request.status };
  } catch (error) {
    // console.log("########### error ############ ", error);
    return error.response;
  }
};

export const ResetPassword = async (userId) => {
  const gym = gyns.find((x) => x.isDefault);

  try {
    const url = `/user/${userId}/gym/${gym.id}/changepassword`;
    const token = getCookie(authCookieKeys.token);

    const request = await api.put(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return { data: request.data, statusCode: request.status };
  } catch (error) {
    // console.log("########### error ############ ", error);
    return error.response;
  }
};
