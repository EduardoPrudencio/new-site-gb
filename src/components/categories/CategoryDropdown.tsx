import React, { useContext } from "react";

import Navigations from "@data/navigations";

import CategoryMenuItem from "./category-menu-item/CategoryMenuItem";
import { StyledCategoryDropdown } from "./CategoryDropdownStyle";
import MegaMenu1 from "./mega-menu/MegaMenu1";
import MegaMenu2 from "./mega-menu/MegaMenu2";
import Button from "@component/buttons/Button";
import { AuthCotext } from "@context/AuthContext";
import { useRouter } from "next/router";

export interface CategoryDropdownProps {
  open: boolean;
  position?: "absolute" | "relative";
}

const CategoryDropdown: React.FC<CategoryDropdownProps> = ({
  open,
  position,
}) => {
  const megaMenu = {
    MegaMenu1,
    MegaMenu2,
  };

  const { isAuthenticated, logOut } = useContext(AuthCotext);
  const router = useRouter();

  return (
    <StyledCategoryDropdown open={open} position={position}>
      {Navigations().map((item) => {
        const MegaMenu = megaMenu[item.menuComponent];
        if ( !item.show ) return

        return (
          <CategoryMenuItem
            title={item.title}
            href={item.href}
            icon={item.icon}
            caret={false}
            key={item.title}
          >
            <MegaMenu data={item.title || {}} />
          </CategoryMenuItem>
        );
      })}

      {isAuthenticated &&
        <Button
          onClick={() => {
            logOut();
            router.reload();
          }} >Sair
        </Button>
      }
    </StyledCategoryDropdown>
  );
};

CategoryDropdown.defaultProps = {
  position: "absolute",
};

export default CategoryDropdown;
