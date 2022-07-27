import React from "react";

import Badge from "@component/badge/Badge";
import Box from "@component/Box";
import Card from "@component/Card";
import MenuItem from "@component/MenuItem";
import NavbarNavigations from "@data/navbarNavigations";

import Container from "../Container";
import FlexBox from "../FlexBox";
import Icon from "../icon/Icon";
import NavLink from "../nav-link/NavLink";
import { Span } from "../Typography";
import StyledNavbar from "./NavbarStyle";

interface INav {
  title: string;
  url: string;
  badge: string;
  child: INav[];
  extLink?: boolean;
}

const Navbar: React.FC = () => {
  const renderNestedNav = (list: any[], isRoot = false) => {
    return list?.map((nav: INav) => {
      if (isRoot) {
        if (nav.url && nav.extLink)
          return (
            <NavLink
              className="nav-link"
              href={nav.url}
              key={nav.title}
              target="_blank"
              rel="noopener noreferrer"
            >
              {nav.badge ? (
                <Badge style={{ marginRight: "0px" }} title={nav.badge}>
                  {nav.title}
                </Badge>
              ) : (
                <Span className="nav-link">{nav.title}</Span>
              )}
            </NavLink>
          );
        if (nav.url)
          return (
            <NavLink className="nav-link" href={nav.url} key={nav.title}>
              {nav.badge ? (
                <Badge style={{ marginRight: "0px" }} title={nav.badge}>
                  {nav.title}
                </Badge>
              ) : (
                <Span className="nav-link">{nav.title}</Span>
              )}
            </NavLink>
          );
        if (nav.child)
          return (
            <FlexBox
              className="root"
              position="relative"
              flexDirection="column"
              alignItems="center"
              key={nav.title}
            >
              {nav.badge ? (
                <Badge title={nav.badge}>{nav.title}</Badge>
              ) : (
                <Span className="nav-link">{nav.title}</Span>
              )}
              <Box className="root-child">
                <Card
                  width={600}
                  mt="1.25rem"
                  py="0.5rem"
                  boxShadow="large"
                  minWidth="230px"
                >
                  {renderNestedNav(nav.child)}
                </Card>
              </Box>
            </FlexBox>
          );
      } else {
        if (nav.url)
          return (
            <NavLink href={nav.url} key={nav.title}>
              <MenuItem>
                {nav.badge ? (
                  <Badge style={{ marginRight: "0px" }} title={nav.badge}>
                    {nav.title}
                  </Badge>
                ) : (
                  <Span className="nav-link">{nav.title}</Span>
                )}
              </MenuItem>
            </NavLink>
          );

        if (nav.child)
          return (
            <Box
              className="parent"
              position="relative"
              minWidth="230px"
              key={nav.title}
            >
              <MenuItem
                style={{ display: "flex", justifyContent: "space-between" }}
                color="gray.700"
              >
                {nav.badge ? (
                  <Badge style={{ marginRight: "0px" }} title={nav.badge}>
                    {nav.title}
                  </Badge>
                ) : (
                  <Span className="nav-link">{nav.title}</Span>
                )}
                <Icon size="8px" defaultcolor="currentColor">
                  right-arrow
                </Icon>
              </MenuItem>
              <Box className="child" pl="0.5rem">
                <Card py="0.5rem" boxShadow="large" minWidth="230px" width={600}>
                  {renderNestedNav(nav.child)}
                </Card>
              </Box>
            </Box>
          );
      }
    });
  };

  return (
    <StyledNavbar>
      <Container
        display="flex"
        justifyContent="flex-start"
        alignItems="center"
        width="1200px"
        height="100%"
      >
        <FlexBox>{renderNestedNav(NavbarNavigations(), true)}</FlexBox>
      </Container>
    </StyledNavbar>
  );
};

export default Navbar;
