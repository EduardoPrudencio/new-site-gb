import { shadowOptions } from "interfaces";
import styled from "styled-components";
import {
  border,
  BorderProps,
  color,
  ColorProps,
  space,
  SpaceProps,
} from "styled-system";

import { getTheme } from "../utils/utils";

interface ITableRowProps extends SpaceProps, ColorProps, BorderProps {
  boxShadow?: shadowOptions;
}

const TableRowSimple = styled.div<ITableRowProps>`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  border-radius: 10px;
  box-shadow: ${({ boxShadow }) => getTheme(`shadows.${boxShadow || "small"}`)};

  & > * {
    margin-right: 20px;
  }

  .pre {
    white-space: pre;
  }

  ${space}
  ${color}
  ${border}
`;

TableRowSimple.defaultProps = {
  bg: "body.paper",
};

export default TableRowSimple;
