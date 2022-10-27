import { getCookie } from "cookies-next";

const NavbarNavigations = () => {
  const gym = getCookie("gym.name");
  const navbar = [
    {
      title: "Início",
      url: typeof gym !== "undefined" ? `\\${gym}` : "\\",
    },
    {
      title: "Horários",
      url: "/campos-dos-goytacazes/horarios",
    },
  ];

  return navbar
}

export default NavbarNavigations;
