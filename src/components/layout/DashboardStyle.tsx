import { theme } from "@utils/theme";
import styled from "styled-components";

import { getTheme } from "../../utils/utils";
import Card from "../Card";
import FlexBox from "../FlexBox";
import NavLink from "../nav-link/NavLink";

export const DashboardNavigationWrapper = styled(Card)`
  @media only screen and (max-width: 768px) {
    height: calc(100vh - 64px);
    box-shadow: none;
    overflow-y: auto;
  }
`;

export const StyledDashboardNav = styled(NavLink)<{ isCurrentPath?: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-left: 4px solid;
  color: ${({ isCurrentPath }) =>
    isCurrentPath ? theme.colors.primary[500] : "inherit"};
  border-left-color: ${({ isCurrentPath }) =>
    isCurrentPath ? theme.colors.primary[500] : "transparent"};

  .dashboard-nav-icon-holder {
    color: ${getTheme("colors.gray.600")};
  }

  :hover {
    border-left-color: ${theme.colors.primary[500]};

    .dashboard-nav-icon-holder {
      color: ${theme.colors.primary[500]};
    }
  }
`;

export const StyledDashboardPageTitle = styled(FlexBox)``;
