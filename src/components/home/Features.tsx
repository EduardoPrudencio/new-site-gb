import Image from "next/image";

import React from "react";

import headphoneImage from "../../../public/assets/images/icons/headphone-bebanca.svg";
import magazineImage from "../../../public/assets/images/icons/magazine-bebanca.svg";
import menuImage from "../../../public/assets/images/icons/menu-bebanca.svg";
import newspapersImage from "../../../public/assets/images/icons/newspaper-bebanca.svg";
import Card from "../Card";
import Container from "../Container";
import FlexBox from "../FlexBox";
import Grid from "../grid/Grid";
import { H4, SemiSpan } from "../Typography";

const serviceList = [
  {
    icon: newspapersImage,
    title: "Jornais",
    description: "Os melhores jornais do Brasil no seu celular",
    alt: "Icone de um jornal dobrado.",
  },
  {
    icon: magazineImage,
    title: "Revistas",
    description: "As principais revistas, todas no mesmo app",
    alt: "Icone de uma revista",
  },
  {
    icon: menuImage,
    title: "Notícias",
    description: "Feed de notícias em tempo real",
    alt: "Icone de do menu, três riscos dentro de um quadrado",
  },
  {
    icon: headphoneImage,
    title: "Rádio",
    description: "Rádios ao vivo com notícias e futebol",
    alt: "Icone de um fone de ouvido.",
  },
];

const Features: React.FC = () => {
  return (
    <Container mb="70px">
      <Grid container spacing={2}>
        {serviceList.map((item, ind) => {
          const key = ind;
          return (
            <Grid item lg={3} md={6} xs={12} key={key}>
              <FlexBox
                as={Card}
                flexDirection="column"
                alignItems="center"
                p="3rem"
                height="100%"
                borderRadius={8}
                boxShadow="border"
                hoverEffect
              >
                <FlexBox
                  justifyContent="center"
                  alignItems="center"
                  borderRadius="300px"
                  size="80px"
                >
                  <Image src={item.icon} alt={item.alt} />
                </FlexBox>
                <H4 mt="20px" mb="10px" textAlign="center">
                  {item.title}
                </H4>
                <SemiSpan textAlign="center">{item.description}</SemiSpan>
              </FlexBox>
            </Grid>
          );
        })}
      </Grid>
    </Container>
  );
};

export default Features;
