import React from "react";
import Box from "@component/Box";
import { H5 } from "@component/Typography";

type CardProps = {
  title?: string;
};

const CardTitle: React.FC<CardProps> = ({ title }) => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100%"
    >
      <H5 fontSize="50px">Gracie barra</H5>
      {title && <H5 fontSize="30px">{title}</H5>}
    </Box>
  );
};

export default CardTitle;
