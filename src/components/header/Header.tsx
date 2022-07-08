import Link from "next/link";

import React, { useContext } from "react";
import Avatar from "react-user-avatar";

import Button from "@component/buttons/Button";
import IconButton from "@component/buttons/IconButton";
import Image from "@component/Image";

import { AuthCotext } from "@context/AuthContext";

import Categories from "../categories/Categories";
import Container from "../Container";
import FlexBox from "../FlexBox";
import Icon from "../icon/Icon";
import Typography from "../Typography";
import StyledHeader from "./HeaderStyle";

type HeaderProps = {
  isFixed?: boolean;
  className?: string;
  navListOpen?: boolean;
};

const Header: React.FC<HeaderProps> = ({ className, navListOpen }) => {
  const { user, isAuthenticated } = useContext(AuthCotext);

  return (
    <StyledHeader className={className}>
      <Container
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        height="100%"
        maxWidth="1220px"
      >

          <Link href="/campos-dos-goytacazes">
            <a>
              <Image src="/assets/images/gb-logo.svg" alt="logo" height="100px" />
            </a>
          </Link>
          
        
          {isAuthenticated ? (
            <Categories open={navListOpen}>
            <Button
              width="278px"
              height="40px"
              variant="text"
            >
              <Typography
                fontWeight="600"
                textAlign="left"
                flex="1 1 0"
                ml="10px"
                color="text.muted"
              >
                {`${user.name} ${user.lastName}`}
              </Typography>
              <Icon className="dropdown-icon" variant="small">
                chevron-right
              </Icon>
            </Button>
          </Categories>

          ) : (
            <Link href="/signin">
              <a>
                Login
              </a>
            </Link>
          )}
      </Container>
    </StyledHeader>
  );
};

export default Header;
