import { AuthCotext } from "@context/AuthContext";
import { getCookie } from "cookies-next";
import { useContext } from "react";

const gym = getCookie("gym.name");

const Navigations = () => {
  const { isAuthenticated, user } = useContext(AuthCotext);
  
  const nav = [
    {
      icon: "",
      title: "Perfil",
      href: `/account/${user.id}`,
      menuComponent: "MegaMenu1",
      show: true,
    },
    {
      icon: "",
      title: "Trocar Senha",
      href: `/account/changepassword/${user.id}`,
      menuComponent: "MegaMenu1",
      show: true,
    },
    {
      icon: "",
      title: "Novo Aluno",
      href: "/admin/add-user",
      menuComponent: "MegaMenu1",
      show: user.isAdministrator,
    },
    {
      icon: "",
      title: "Financeiro",
      href: "/payments",
      menuComponent: "MegaMenu1",
      show: user.isAdministrator,
    },
    {
      icon: "",
      title: "Alunos",
      href: "/admin/users",
      menuComponent: "MegaMenu1",
      show: user.isAdministrator,
    },
    {
      icon: "",
      title: "Presença",
      href: "/admin/presences",
      menuComponent: "MegaMenu1",
      show: user.isAdministrator,
    },
  ];
  
  return nav
}

export default Navigations;
