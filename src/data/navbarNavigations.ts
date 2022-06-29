import { AuthCotext } from "@context/AuthContext";
import { useContext } from "react";

const NavbarNavigations = () => {

  const { user, isAuthenticated } = useContext(AuthCotext);

  const navbar = [
    {
      title: "Home",
      url: "/",
    },
  ];

  if(isAuthenticated && user.showNewspaper && !user.showMagazine) { delete navbar[2]; delete navbar[4]; return navbar}
  if(isAuthenticated && user.showMagazine && !user.showNewspaper) { delete navbar[1]; delete navbar[3]; return navbar} 
    
  return navbar
}

export default NavbarNavigations;
