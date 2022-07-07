import { User } from "types";
import api from "../client";

export async function me(): Promise<User> {
  const {
    data: { user },
  } = await api.get("/v1/user");

  return {
    id: user.id,
    name: user.nickname,
    email: user.email,
    lastName: user.lastName,
    userRoles: user.user,
    birthDate: user.birthDate,
    image: user.image,
    phoneNumber: user.phoneNumber,
    active: user.active
  };
}
