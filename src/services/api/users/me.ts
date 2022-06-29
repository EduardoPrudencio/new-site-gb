import api from "../client";

type User = {
  id: string;
  name: string;
  email: string;
  premium: boolean;
  showNewspaper: boolean;
  showMagazine: boolean;
};

export async function me(): Promise<User> {
  const {
    data: { user },
  } = await api.get("/v1/user");

  return {
    id: user.id,
    name: user.nickname,
    email: user.email,
    premium: user.permissions.subscription.premium,
    showNewspaper: user.permissions.newspaper.show,
    showMagazine: user.permissions.magazine.show,
  };
}
