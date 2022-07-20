import { H4 } from "@component/Typography";
import React from "react";
import { StyledCarouselCard1 } from "./StyledCarouselCard1";

const CarouselCard1: React.FC = () => {
  return (
    <StyledCarouselCard1>
      <div>
        <h1 className="title">Venha fazer parte desse time</h1>
        <H4 color="secondary.main" mb="1.35rem">
          Sabemos que nossas diferenças é o que nos torna iguais.
        </H4>
      </div>

      <div className="image-holder">
        <img src="/assets/images/gb-kids.png" alt="apple-watch-1" />
      </div>
    </StyledCarouselCard1>
  );
};

export default CarouselCard1;
