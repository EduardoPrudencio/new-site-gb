import Typography from "@component/Typography";
import React from "react";
import { StyledCarouselCard1 } from "./StyledCarouselCard1";

export interface CarouselCard1Props {}

const CarouselCard1: React.FC<CarouselCard1Props> = () => {
  return (
    <StyledCarouselCard1>
      <div>
        <h1 className="title">Venha fazer parte desse time</h1>
        <Typography color="secondary.main" mb="1.35rem">
          Sabemos que nossas diferenças é o que nos torna iguais.
        </Typography>
        {/* <Button
          className="button-link"
          variant="contained"
          color="primary"
          p="1rem 1.5rem"
        >

        </Button> */}
      </div>

      <div className="image-holder">
        <img
          src="/assets/images/gb-kids.png"
          alt="apple-watch-1"
        />
      </div>
    </StyledCarouselCard1>
  );
};

export default CarouselCard1;