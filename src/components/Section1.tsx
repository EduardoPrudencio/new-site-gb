import React from "react";

import Box from "@component/Box";
import Carousel from "@component/carousel/Carousel";
import Container from "@component/Container";
import useWindowSize from "@hook/useWindowSize";

import CardTitle from "./carousel/cards/CardTitle";
import CarouselCard1 from "./carousel/cards/CarouselCard1";
import CarouselCard2 from "./carousel/cards/CarouselCard2";
import CardTitleMobile from "./carousel/cards/mobile/CardTitle";
import CarouselCard1Mobile from "./carousel/cards/mobile/CarouselCard1";
import CarouselCard2Mobile from "./carousel/cards/mobile/CarouselCard2";

type SectionProps = {
  title?: string;
};

const Section1: React.FC<SectionProps> = ({ title }) => {
  const [width] = useWindowSize();
  const isMobile = width < 570;

  return (
    <Box bg="gray.white">
      <Container pb="5rem">
        {isMobile ? (
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
            <CardTitleMobile title={title} />
            <CarouselCard1Mobile />
            <CarouselCard2Mobile />
          </Carousel>
        ) : (
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
        )}
      </Container>
    </Box>
  );
};
export default Section1;
