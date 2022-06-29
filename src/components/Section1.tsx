import Box from "@component/Box";
import Carousel from "@component/carousel/Carousel";
import Container from "@component/Container";
import Navbar from "@component/navbar/Navbar";
import CarouselCard1 from "./carousel/cards/CarouselCard1";

const Section1: React.FC = () => {
  return (
    <>
      <Navbar />
      <Box bg="gray.white" mb="3.75rem">
        <Container pb="2rem">
          <Carousel
            totalSlides={5}
            visibleSlides={1}
            infinite
            autoPlay
            showDots
            showArrow={false}
            spacing="0px"
          >
            <CarouselCard1 />
            <CarouselCard1 />
            <CarouselCard1 />
          </Carousel>
        </Container>
      </Box>
    </>
  );
};

export default Section1;