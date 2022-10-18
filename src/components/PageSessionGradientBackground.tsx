import React from "react";

import styled from "styled-components";

interface IPageSessionGradientBackgroundProps {
  backgroundColor?: string;
  backgroundRadial?: string;
  height: number;
}

const Container = styled.div<IPageSessionGradientBackgroundProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: ${({ height }) => height}px;
  background: ${({ backgroundRadial }) => backgroundRadial || ""};
  background-color: ${({ backgroundColor }) => backgroundColor || "#ffffff"};
`;

const PageSessionGradientBackground: React.FC<
  IPageSessionGradientBackgroundProps
> = ({ children, backgroundColor, backgroundRadial, ...props }) => {
  return (
    <Container
      backgroundColor={backgroundColor}
      backgroundRadial={backgroundRadial}
      {...props}
    >
      {children}
    </Container>
  );
};

export default PageSessionGradientBackground;
