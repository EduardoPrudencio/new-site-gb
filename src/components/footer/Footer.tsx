import Link from "next/link";

import React from "react";

import AppStore from "@component/AppStore";
import Image from "@component/Image";
import { theme } from "@utils/theme";

import Box from "../Box";
import Container from "../Container";
import FlexBox from "../FlexBox";
import Grid from "../grid/Grid";
import Icon from "../icon/Icon";
import Typography, { Paragraph } from "../Typography";
import { StyledLink } from "./styles";

const Footer: React.FC = () => {
  return (
    <footer>
      <Box bg={theme.colors.secondary[900]}>
        <Container color="white">
          <Box py="5rem" overflow="hidden">
            <Grid container spacing={8}>
              <Grid item lg={4} md={6} sm={6} xs={12}>
                <Link href="/">
                  <Image
                    mb="1.25rem"
                    src="/assets/images/gb-logo.svg"
                    height="180px"
                    alt="logo"
                  />
                </Link>
               
              </Grid>

              <Grid item lg={2.5} md={6} sm={6} xs={12}>
                <Typography
                  fontSize="25px"
                  fontWeight="600"
                  mb="1.25rem"
                  lineHeight="1"
                >
                  Sobre
                </Typography>

                <div>
                  {aboutLinks.map((item, ind) => (
                    <div>
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noreferrer"
                      key={ind}
                    >
                      <StyledLink>{item.title}</StyledLink>
                    </a></div>
                  ))}
                </div>
              </Grid>

              <Grid item lg={2.5} md={6} sm={6} xs={12}>
                <Typography
                  fontSize="25px"
                  fontWeight="600"
                  mb="1.25rem"
                  lineHeight="1"
                >
                  Clientes
                </Typography>

                <div>
                  {customerCareLinks.map((item, ind) => (
                    <div>
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noreferrer"
                      key={ind}
                    >
                      <StyledLink>{item.title}</StyledLink>
                    </a></div>
                  ))}
                </div>
              </Grid>

              <Grid item lg={2.5} md={6} sm={6} xs={12}>
                <Typography
                  fontSize="25px"
                  fontWeight="600"
                  mb="1.25rem"
                  lineHeight="1"
                >
                  Gracie Barra
                </Typography>
                <Typography py="0.3rem" color="gray.500">
                  INOVAIDEIA CONSULTORIA EM TECNOLOGIA LTDA.
                </Typography>

                <Typography py="0.3rem" color="gray.500">
                  Copyright © 2022.
                </Typography>

                <Typography py="0.3rem" mb="1rem" color="gray.500">
                  Todos os direitos reservados.
                </Typography>

                <FlexBox className="flex" mx="-10px">
                  {iconList.map((item) => (
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noreferrer"
                      key={item.iconName}
                    >
                      <Box
                        m="5px"
                        size="small"
                        p="10px"
                        bg={theme.colors.secondary[700]}
                        borderRadius="50%"
                      >
                        <Icon size="12px" defaultcolor="auto">
                          {item.iconName}
                        </Icon>
                      </Box>
                    </a>
                  ))}
                </FlexBox>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Box>
    </footer>
  );
};

const aboutLinks = [
  { title: "Quem somos", url: "#" },
];

const customerCareLinks = [
  {
    external: true,
    title: "Fale conosco",
    url: "#",
  },
];

const iconList = [
  { iconName: "facebook", url: "https://pt-br.facebook.com/GB72campos/" },
  { iconName: "instagram", url: "https://www.instagram.com/graciebarracampos/?hl=en" },
];

export default Footer;
