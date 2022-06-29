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
        maxWidth="1200px"
      >
        <FlexBox className="logo" alignItems="center" mr="1rem">
          <Categories open={navListOpen}>
            <Button
              width="278px"
              height="40px"
              bg="body.default"
              variant="text"
            >
              <Icon>categories</Icon>
              <Typography
                fontWeight="600"
                textAlign="left"
                flex="1 1 0"
                ml="10px"
                color="text.muted"
              >
                Menu
              </Typography>
              <Icon className="dropdown-icon" variant="small">
                chevron-right
              </Icon>
            </Button>
          </Categories>
        </FlexBox>

        <FlexBox justifyContent="center" flex="1 1 0">
          <Link href="/">
            <a>
              <Image src="/assets/images/gb-logo.svg" alt="logo" height="100px" />
            </a>
          </Link>
        </FlexBox>

        <FlexBox className="header-right" alignItems="center">
          {isAuthenticated ? (
            <Link href="/account/profile">
              <a>
                <Avatar size="48" name={user && user.name} color="#ccc" />
              </a>
            </Link>
          ) : (
            <Link href="/signin">
              <a>
                <IconButton ml="1rem" bg="gray.200" p="8px">
                  <Icon size="28px">user</Icon>
                </IconButton>
              </a>
            </Link>
          )}
        </FlexBox>
      </Container>
    </StyledHeader>
  );
};

export default Header;
