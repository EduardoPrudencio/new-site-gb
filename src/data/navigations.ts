import { AuthCotext } from "@context/AuthContext";
import { getCookie } from "cookies-next";
import { useContext } from "react";

const gym = getCookie("gym.name");

const Navigations = () => {
  
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
  ];
  
  // if(isAuthenticated && user.showNewspaper && !user.showMagazine) { delete nav[2]; delete nav[4]; return nav}
  // if(isAuthenticated && user.showMagazine && !user.showNewspaper) { delete nav[1]; delete nav[3]; return nav }

  return nav
}

export default Navigations;
