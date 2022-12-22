import React from "react";
import NextImage from "next/image";
import Box from "../Box";
import Typography from "../Typography";
import FlexBox from "@component/FlexBox";
import Icon from "@component/icon/Icon";
import useWindowSize from "@hook/useWindowSize";

const Footer: React.FC = () => {

  const [width] = useWindowSize();
  const isMobile = width < 570;

  return (
    <footer>
      <Box
        display="flex"
        flexDirection="row"
        alignItems="center"
        justifyContent="center"
        bg="#333333"
        paddingTop="5px"
        paddingBottom={!isMobile ? "20px" : "68px"}
      >
        <Box
          display="flex"
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between"
          width="1200px"
        >
          <Box display="flex" flexDirection="column">
              <Box
                display="flex"
                flexDirection="row"
                alignItems="start"
                justifyContent="start"
                pt={!isMobile ? "20px" : "0"}
              >
              
                <NextImage
                  src="/assets/images/gb-logo-pb.png"
                  alt="logo gracie barra"
                  height={isMobile ? "80px" : "110px"}
                  width={isMobile ? "80px" : "110px"}
                  objectFit="cover"
                />

                {!isMobile && 
                <Box
                  display="flex"
                  flexDirection="column"
                  alignItems="start"
                  justifyContent="start"
                  marginLeft="20px"
                >
                  <Typography color="#ffffff" mt="20px" mb="10px">Contatos</Typography>
                  <Typography color="#ffffff" fontSize="13px">
                    tel: (22)99763-5120
                  </Typography>
                  <Typography color="#ffffff" fontSize="13px">
                    e-mail: gbricardorocha@gmail.com
                  </Typography>
                </Box>
                }
              </Box>
              {!isMobile && 
                <Typography py="0.3rem" color="gray.500" marginTop="10px">
                  Copyright © 2022.
                </Typography>
              }
          </Box>

          {isMobile && 
            <Typography py="0.3rem" color="gray.500">
              Copyright © 2022.
            </Typography>
          }

        <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center">
        <FlexBox className="flex">
          {iconList.map((item) => {
            return (
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
                    {item.iconName}
                  </Icon>
                </Box>
              </a>
            );
          })}
        </FlexBox>
        {!isMobile && 
        <Box display="flex" flexDirection="row" alignItems="center">
          
        <Typography py="0.3rem" color="gray.500">
         Desenvolvido por:
       </Typography>
       <a
           href="#"
           target="_blank"
           rel="noreferrer"
           key="#"
         >
          <Typography color="gray.500" marginLeft="5px">
            Eduardo Prudencio
          </Typography>
         </a>
         </Box>
          }
          
        </Box>

        </Box>
      </Box>
    </footer>
  );
};


const iconList = [
  { iconName: "facebook", url: "https://pt-br.facebook.com/GB72campos/" },
  { iconName: "instagram", url: "https://www.instagram.com/graciebarracampos/?hl=en" },
];

export default Footer;
