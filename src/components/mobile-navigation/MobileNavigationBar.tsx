import React from "react";

import { Chip } from "@component/Chip";

import { useAppContext } from "@context/app/AppContext";

import useWindowSize from "../../hooks/useWindowSize";
import Icon from "../icon/Icon";
import NavLink from "../nav-link/NavLink";
import StyledMobileNavigationBar from "./MobileNavigationBar.style";
import { getCookie } from "cookies-next";

const MobileNavigationBar: React.FC = () => {
  const [width] = useWindowSize();
  const { state } = useAppContext();
  const { cartList } = state.cart;

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

const gym = getCookie("gym.name");
const list = [
  {
    title: "Home",
    icon: "home",
    href: typeof gym !== "undefined" ? `\${gym.name}` : "\\",
  },
  {
    title: "Horários",
    icon: "schedule",
    href: "/horarios",
  },
  {
    title: "Conta",
    icon: "user-2",
    href: "/account/profile",
  },
];

export default MobileNavigationBar;
