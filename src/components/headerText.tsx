import React from "react";

import Box from "./Box";
import Typography from "./Typography";

interface IProps {
  maxWidth?: number;
  color?: string;
  bold?: boolean;
  text?: string;
  chieldren?: any;
}

const HeaderText: React.FC<IProps> = ({
  maxWidth,
  color,
  bold,
  text,
  children,
}) => {
  return (
    <Box width={maxWidth}>
      <Typography color={color} fontWeight={bold ? "bold" : "normal"}>
        {text}
        {children}
      </Typography>
    </Box>
  );
};

export default HeaderText;
