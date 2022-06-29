import { useRouter } from "next/router";

import React, { Fragment, useContext } from "react";

import Box from "@component/Box";
import Button from "@component/buttons/Button";
import { theme } from "@utils/theme";

import { AuthCotext } from "@context/AuthContext";

import FlexBox from "../FlexBox";
import Icon from "../icon/Icon";
import Typography from "../Typography";
import {
  DashboardNavigationWrapper,
  StyledDashboardNav,
} from "./DashboardStyle";

const CustomerDashboardNavigation = () => {
  const { pathname } = useRouter();
  const { logOut } = useContext(AuthCotext);
  const router = useRouter();

  return (
    <DashboardNavigationWrapper
      px="0px"
      pb="1.5rem"
      color="gray.900"
      width="240px"
    >
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
        height="662px"
      >
        <Box>
          {linkList.map((item) => (
            <Fragment key={item.title}>
              <Typography p="26px 30px 1rem" color="text.muted" fontSize="12px">
                {item.title}
              </Typography>
              {item.list.map((item) => (
                <StyledDashboardNav
                  isCurrentPath={pathname.includes(item.href)}
                  href={item.href}
                  key={item.title}
                  px="1.5rem"
                  mb="1.25rem"
                >
                  <FlexBox alignItems="center">
                    <Box className="dashboard-nav-icon-holder">
                      <Icon
                        variant="small"
                        defaultcolor="currentColor"
                        mr="10px"
                      >
                        {item.iconName}
                      </Icon>
                    </Box>
                    <span>{item.title}</span>
                  </FlexBox>
                  {item.count > 0 && <span>{item.count}</span>}
                </StyledDashboardNav>
              ))}
            </Fragment>
          ))}
        </Box>
        <Box
          display="flex"
          flexDirection="row"
          alignItems="center"
          justifyContent="center"
        >
          <Button
            mb="22px"
            variant="contained"
            color="primary"
            backgroundColor={theme.colors.primary[500]}
            onClick={() => {
              logOut();
              router.reload();
            }}
          >
            Sair
          </Button>
        </Box>
      </Box>
    </DashboardNavigationWrapper>
  );
};

const linkList = [
  {
    title: "",
    list: [
      {
        href: "/account/profile",
        title: "Perfil",
        iconName: "user",
        count: 0,
      },
      {
        href: "/account/voucher",
        title: "Vouchers",
        iconName: "heart",
        count: 0,
      },
      {
        href: "/account/payments",
        title: "Pagamentos",
        iconName: "credit-card",
        count: 0,
      },
    ],
  },
];

export default CustomerDashboardNavigation;
