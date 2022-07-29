import React from "react";
import Box from "@component/Box";
import Carousel from "@component/carousel/Carousel";
import Container from "@component/Container";
import Navbar from "@component/navbar/Navbar";
import CarouselCard1 from "./carousel/cards/CarouselCard1";
import CarouselCard2 from "./carousel/cards/CarouselCard2";
import CardTitle from "./carousel/cards/CardTitle";

type SectionProps = {
  title?: string;
};

const Section1: React.FC<SectionProps> = ({ title }) => {
  return (
    <>
      <Navbar />
      <Box bg="gray.white" mb="3.75rem">
        <Container pb="2rem">
          <Carousel
            totalSlides={3}
            visibleSlides={1}
            infinite
            autoPlay
            showDots
            showArrow={false}
            spacing="0px"
            interval={3000}
          >
            <CardTitle title={title} />
            <CarouselCard1 />
            <CarouselCard2 />
          </Carousel>
        </Container>
      </Box>
    </>
  );
};
export default Section1;
