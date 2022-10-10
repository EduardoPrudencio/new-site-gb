import React from "react";
import Image from "@component/Image";
import Box from "../Box";
import Typography from "../Typography";
import FlexBox from "@component/FlexBox";
import Icon from "@component/icon/Icon";

const Footer: React.FC = () => {
  return (
    <footer>
      <Box
        display="flex"
        flexDirection="row"
        alignItems="center"
        justifyContent="center"
        bg="#333333"
        paddingTop="20px"
      >
        <Box
          display="flex"
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between"
          width="1200px"
        >
        <Image
          mb="1.25rem"
          src="/assets/images/gb-logo-pb.png"
          height="130px"
          alt="logo"
        />

        <Typography py="0.3rem" color="gray.500">
          Copyright © 2022.
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
                borderRadius="50%"
                bg="#000"
              >
                <Icon size="22px" defaultcolor="#7f0b0d">
                {  item.iconName}
                </Icon>
              </Box> 
            </a>
          ))}
        </FlexBox>

        </Box>
        {/* <Container color="white">
          
          <Box py="5rem" overflow="hidden">
            <Grid container spacing={0}>
              <Grid item lg={4} md={6} sm={6} xs={12}>
                  <Image
                    mb="1.25rem"
                    src="/assets/images/gb-logo-pb.png"
                    height="130px"
                    alt="logo"
                  />
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



              </Grid>
            </Grid>
          </Box>
        </Container> */}
      </Box>
    </footer>
  );
};


const iconList = [
  { iconName: "facebook", url: "https://pt-br.facebook.com/GB72campos/" },
  { iconName: "instagram", url: "https://www.instagram.com/graciebarracampos/?hl=en" },
];

export default Footer;
