import Link from "next/link";

import React, { useContext, useEffect, useState } from "react";
import Button from "@component/buttons/Button";
import Image from "@component/Image";

import { AuthCotext } from "@context/AuthContext";

import Categories from "../categories/Categories";
import Container from "../Container";
import Icon from "../icon/Icon";
import Typography from "../Typography";
import StyledHeader from "./HeaderStyle";
import Navbar from "@component/navbar/Navbar";
import Box from "@component/Box";

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
        maxWidth="1222px"
      >
          
          <Box
            display="flex"
            flexDirection="row"
            alignItems="center"
            justifyContent="space-between"
            mt="20px"
            width="230px"
          >
            <Image src="/assets/images/gb-logo.svg" alt="logo" height="100px" />
            <Navbar />      
          </Box>
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
