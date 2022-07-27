export type User = {
  id: string;
  name: string;
  userName: string;
  lastName: string;
  email: string;
  userRoles: string;
  birthDate: string;
  image: string;
  phoneNumber: string;
  active: boolean;
  isAdministrator: boolean;
};

export type AuthContextType = {
  isAuthenticated: boolean;
  user: User;
  signIn: ({ login, password }) => Promise<boolean>;
  logOut: () => void;
};

export type SignInData = {
  login: string;
  password: string;
};
