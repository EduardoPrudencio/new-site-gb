import React, { useContext } from "react";

import { Chip } from "@component/Chip";

import { useAppContext } from "@context/app/AppContext";

import useWindowSize from "../../hooks/useWindowSize";
import Icon from "../icon/Icon";
import NavLink from "../nav-link/NavLink";
import StyledMobileNavigationBar from "./MobileNavigationBar.style";
import { getCookie } from "cookies-next";
import { AuthCotext } from "@context/AuthContext";

const MobileNavigationBar: React.FC = () => {
  const {user } = useContext(AuthCotext);
  const [width] = useWindowSize();
  const { state } = useAppContext();
  const { cartList } = state.cart;

  const gym = getCookie("gym.name");
  const list = [
    {
      title: "Início",
      icon: "home",
      href: typeof gym !== "undefined" ? `\\${gym}` : "\\",
    },
    {
      title: "Horários",
      icon: "schedule",
      href: "/campos-dos-goytacazes/horarios",
    },
    {
      title: "Conta",
      icon: "user-2",
      href: `/account/${user?.id}`,
    },
  ];

  return (
    width <= 2000 && (
      <StyledMobileNavigationBar>
        {list.map((item) => (
          <NavLink className="link" href={item.href} key={item.title}>
            <Icon className="icon" variant="small">
              {item.icon}
            </Icon>
            {item.title}

            {item.title === "Cart" && !!cartList.length && (
              <Chip
                bg="primary.main"
                position="absolute"
                color="primary.text"
                fontWeight="600"
                px="0.25rem"
                top="4px"
                left="calc(50% + 8px)"
              >
                {cartList.length}
              </Chip>
            )}
          </NavLink>
        ))}
      </StyledMobileNavigationBar>
    )
  );
};



export default MobileNavigationBar;
