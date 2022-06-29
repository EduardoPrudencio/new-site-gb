import styled from "styled-components";

import { getTheme } from "../../utils/utils";

export const StyledLink = styled.a`
  position: relative;
  color: red;
  display: block;
  padding: 0.3rem 0rem;
  color: ${getTheme("colors.gray.500")};
  cursor: pointer;
  border-radius: 4px;
  :hover {
    color: ${getTheme("colors.gray.100")};
  }
`;
