import { Address } from "cluster";

export type User = {
  id: string;
  name: string;
  userName: string;
  lastName: string;
  email: string;
  userRoles: string;
  birthDate: string;
  registrationDate: string;
  image: string;
  phoneNumber: string;
  active: boolean;
  isAdministrator: boolean;
};

export type Address = {
  endereco: string;
  numero: string;
  complemento: string;
  cidade: string;
  bairro: string;
  uf: string;
  cep: string;
};

export type Student = {
  name: string;
  lastName: string;
  userName: string;
  phoneNumber: string;
  birthDate: string;
  registrationDate: string;
  email: string;
  password: string;
  address: Address;
};

export type Presence = {
  id: string;
  studentId: string;
  studentName: string;
  date: string;
  active: boolean;
  answered: boolean;
  activity: boolean;
};

export type Presences = {
  date: string;
  presences: Presence[];
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
