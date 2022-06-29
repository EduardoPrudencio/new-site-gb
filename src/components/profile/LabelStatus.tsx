/* eslint-disable react/prop-types */
import React from "react";

import Box from "@component/Box";
import { theme } from "@utils/theme";
import styeld from "styled-components";

const LabelGray = styeld.label`
  color: ${theme.colors.gray[600]};
  font-size: 10px;
`;

const LabelGreen = styeld.label`
  color: ${theme.colors.green[200]};
  font-size: 10px;
`;

export const LabelStatusGray = function BuildLabelGray({ title }) {
  return (
    <Box
      display="flex"
      flexDirection="row"
      alignItems="center"
      justifyContent="center"
      bg={theme.colors.gray[300]}
      p="5px"
      borderRadius="20px"
      width="75px"
      height="25px"
      marginRight="20px"
    >
      <LabelGray>{title}</LabelGray>
    </Box>
  );
};

export const LabelStatusGreen = function BuildLabelGreen({ title }) {
  return (
    <Box
      display="flex"
      flexDirection="row"
      alignItems="center"
      justifyContent="center"
      bg={theme.colors.green[100]}
      p="5px"
      borderRadius="20px"
      width="75px"
      height="25px"
      marginRight="20px"
    >
      <LabelGreen>{title}</LabelGreen>
    </Box>
  );
};
