import { AuthCotext } from "@context/AuthContext";
import { getCookie } from "cookies-next";
import { useContext } from "react";

const gym = getCookie("gym.name");

const Navigations = () => {
  const { isAuthenticated, user } = useContext(AuthCotext);
  
  const nav = [
    {
      icon: "",
      title: "Home",
      href: typeof gym !== "undefined" ? `\\${gym}` : "\\",
      menuComponent: "MegaMenu1",
    },
    {
      icon: "",
      title: "Perfil",
      href: "/account/perfil",
      menuComponent: "MegaMenu1",
    },
    {
      icon: "",
      title: "Novo Aluno",
      href: "/admin/add-user",
      menuComponent: "MegaMenu1",
    },
    ,
    {
      icon: "",
      title: "Alunos",
      href: "/admin/users",
      menuComponent: "MegaMenu1",
    },
  ];
  
  if(!isAuthenticated || !user.isAdministrator) { delete nav[2]; delete nav[3]; return nav}

  return nav
}

export default Navigations;
