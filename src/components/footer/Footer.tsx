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
        paddingBottom="70px"
      >
        <Box
          display="flex"
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between"
          width="1200px"
        >
        
        <NextImage
          src="/assets/images/gb-logo-pb.png"
          alt="logo gracie barra"
          height={isMobile ? "80px" : "110px"}
          width={isMobile ? "80px" : "110px"}
          objectFit="cover"
        />

        <Typography py="0.3rem" color="gray.500">
          Copyright © 2022.
        </Typography>

        <FlexBox className="flex">
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
      </Box>
    </footer>
  );
};


const iconList = [
  { iconName: "facebook", url: "https://pt-br.facebook.com/GB72campos/" },
  { iconName: "instagram", url: "https://www.instagram.com/graciebarracampos/?hl=en" },
];

export default Footer;
