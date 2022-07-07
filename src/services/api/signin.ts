import api from "@services/api/client";

export const SigninCall = async (values) => {
  try {
    const response = await api.post("/session", {
      login: values.login,
      password: values.password,
    });
    
    return response;  
  } catch (error) {
    // console.log("########### error ############ ",error );
  }
};

export const refreshSession = async (refreshToken) => {
  const response = await api.patch("/session", {
    refresh_token: refreshToken,
  });

  return response;
};

export const UserUpdate = async ({ name, email, id }) => {
  const response = await api.patch(`/${id}`, {
    customer: { nickname: name, email },
  });

  return response;
};
