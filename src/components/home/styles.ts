import styled from "styled-components";

export const WrapperCarousels = styled.div`
  display: flex;
  margin-bottom: 10rem;

  @media only screen and (max-width: 678px) {
    flex-direction: column;
    margin-bottom: 5rem;
  }
`;
