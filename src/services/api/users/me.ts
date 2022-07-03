import api from "../client";

type User = {
  id: string;
  name: string;
  email: string;
};

export async function me(): Promise<User> {
  const {
    data: { user },
  } = await api.get("/v1/user");

  return {
    id: user.id,
    name: user.nickname,
    email: user.email,
  };
}
