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
      <Title>Venha fazer parte desse time</Title>
      <br />
      <SubTitle>
        Sabemos que nossas diferenças é o que nos torna iguais.
      </SubTitle>

      {/* <div className="image-holder">
        <img src="/assets/images/gb-kids.png" alt="apple-watch-1" />
      </div> */}
    </Container>
  );
};

export default CarouselCard1;
