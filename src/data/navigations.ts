import { AuthCotext } from "@context/AuthContext";
import { useContext } from "react";

const Navigations = () => {

  const { user, isAuthenticated } = useContext(AuthCotext);

  const nav = [
    {
      icon: "",
      title: "Home",
      href: "/",
      menuComponent: "MegaMenu1",
    },
  ];
  
  if(isAuthenticated && user.showNewspaper && !user.showMagazine) { delete nav[2]; delete nav[4]; return nav}
  if(isAuthenticated && user.showMagazine && !user.showNewspaper) { delete nav[1]; delete nav[3]; return nav }

  return nav
}

export default Navigations;
