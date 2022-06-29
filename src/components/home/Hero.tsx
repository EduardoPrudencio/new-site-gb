import React from "react";

import Box from "@component/Box";
import Container from "@component/Container";
import Navbar from "@component/navbar/Navbar";

import Banner from "../banner/Banner";

const Hero: React.FC = () => {
  return (
    <>
      <Navbar />
      <Box bg="gray.white" mb="3.75rem">
        <Container pb="2rem">
          <Banner />
        </Container>
      </Box>
    </>
  );
};

export default Hero;
