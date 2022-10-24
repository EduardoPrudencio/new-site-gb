import React from "react";

import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const Title = styled.label`
  font-weight: bold;
  color: #494949;
  font-size: 35px;
`;

const SubTitle = styled.label`
  font-weight: bold;
  color: #494949;
  font-size: 20px;
`;

const CarouselCard1: React.FC = () => {
  return (
    <Container>
      <Title>Conquiste vitórias além do tatame</Title>
      <SubTitle>
        Nossos ensinamentos não são limitados ao tatame, se aplicam na vida.
      </SubTitle>
      {/* <div className="image-holder">
        <img
          src="/assets/images/gb-vencedor.png"
          alt="aluno com kimono da gb de costas"
          height="450"
        />
      </div> */}
    </Container>
  );
};

export default CarouselCard1;
