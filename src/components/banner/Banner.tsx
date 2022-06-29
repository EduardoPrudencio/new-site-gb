import Image from "next/image";

import React from "react";

import AppStore from "@component/AppStore";

import SmartphonePath from "../../../public/assets/images/banners/smartphone-banner.svg";
import Typography from "../Typography";
import { StyledBanner } from "./BannerStyle";

const Banner: React.FC = () => {
  return (
    <StyledBanner>
      <div>
        <h1 className="title">
          Baixe e tenha os melhores
          <br /> conteúdos na palma da mão.
        </h1>
        <Typography color="secondary.main" mb="1.35rem">
          Faça o download da Bebanca e tenha em um só lugar acesso a <br />
          jornais, revistas e notícias, para ler e ouvir.
        </Typography>
        <AppStore />
      </div>

      <div className="image-holder">
        <Image
          src={SmartphonePath}
          alt="imagem de três smartphones com a tela da bebanca na tela."
        />
      </div>
    </StyledBanner>
  );
};

export default Banner;
