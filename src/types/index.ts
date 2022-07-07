export type Voucher = {
  code: string;
  activated_at: string;
  expiration_days: number;
};

export type Payment = {
  id: number;
  amount: string;
  payment_date: string;
};

export type User = {
  id: string;
  name: string;
  lastName: string;
  email: string;
  userRoles: string;
  birthDate: string;
  image: string;
  phoneNumber: string;
  active: boolean;
};

export type AuthContextType = {
  isAuthenticated: boolean;
  user: User;
  signIn: ({ email, password }) => Promise<boolean>;
  logOut: () => void;
};

export type SignInData = {
  login: string;
  password: string;
};
