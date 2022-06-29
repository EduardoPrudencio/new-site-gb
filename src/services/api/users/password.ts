import { saveSession } from "@utils/saveSession";

import api from "@services/api/client";

export const isValidToken = async (token) => {
  try {
    const { status } = await api.get(`v1/customers/password/${token}`);
    return status === 200;
  } catch (e) {
    return false;
  }
};

export const changePassword = async ({
  password,
  passwordConfirmation,
  token,
}: {
  password: string;
  passwordConfirmation: string;
  token: string;
}) => {
  const {
    status,
    data: {
      token: { refreshToken, token: sessionToken },
    },
  } = await api.patch(`legacy/v2/customers/password/${token}`, {
    customer: {
      password,
      password_confirmation: passwordConfirmation,
      token,
    },
  });

  saveSession({ token: sessionToken, refreshToken });

  return status;
};

export const startPasswordRecovery = async ({ email }: { email: string }) => {
  try {
    await api.post("v1/customers/password/reset", {
      customer: {
        place: email,
        type: "email",
      },
    });

    return null;
  } catch {
    return null;
  }
};
