import { H4 } from "@component/Typography";
import React from "react";
import { StyledCarouselCard1 } from "./StyledCarouselCard1";

const CarouselCard1: React.FC = () => {
  return (
    <StyledCarouselCard1>
      <div>
        <h5 className="title">Conquiste vitórias além do tatame</h5>
        <H4 color="secondary.main" mb="1.35rem">
          Nossos ensinamentos não são limitados ao tatame, se aplicam na vida.
        </H4>
      </div>
      <div className="image-holder">
        <img
          src="/assets/images/gb-vencedor.png"
          alt="aluno com kimono da gb de costas"
          height="450"
        />
      </div>
    </StyledCarouselCard1>
  );
};

export default CarouselCard1;
