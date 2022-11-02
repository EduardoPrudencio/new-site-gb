import NextImage from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

import React from "react";

import { FlagsStates } from "@data/stateList";
import styled from "styled-components";

import Card from "../Card";
import CategorySectionHeader from "../CategorySectionHeader";
import Container from "../Container";
import Grid from "../grid/Grid";
import Typography from "../Typography";

const StyledImage = styled(NextImage)`
  border-radius: 8px;
`;
const ContainerState = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

export interface IState {
  uf: string;
  state: string;
}

type ISectionProps = {
  states: IState[];
};

const StatesBox: React.FC<ISectionProps> = ({ states }) => {
  const router = useRouter(); 
  const handleClickState = (e, item) => {
    e.preventDefault();
    router.push(`jornais/${item.uf}`);
  };

  return (
    <Container mb="4.5rem">
      <CategorySectionHeader title="Jornais por estado" iconName="categories" />
      <ContainerState>
        {states.slice(0, 12).map((item) => {
          return (
            <Grid item lg={2} md={3} sm={6} xs={6} key={item.uf} spacing={3}>
              <Link href="/">
                <a>
                  <Card
                    width={600}
                    display="flex"
                    alignItems="center"
                    p="0.75rem"
                    boxShadow="small"
                    borderRadius={8}
                    hoverEffect
                    onClick={(e) => handleClickState(e, item)}
                  >
                    {FlagsStates[item.uf] && (
                      <StyledImage
                        src={FlagsStates[item.uf]}
                        alt="estado brasileiro"
                        height="52px"
                        width="52px"
                        objectFit="contain"
                      />
                    )}
                    <Typography fontWeight="600" fontSize="14px" ml="10px">
                      {item.state}
                    </Typography>
                  </Card>
                </a>
              </Link>
            </Grid>
          );
        })}
      </ContainerState>
    </Container>
  );
};

export default StatesBox;
