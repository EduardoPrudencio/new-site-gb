import NextImage from "next/image";
import { useRouter } from "next/router";

import React, { useCallback, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

import AppStore from "@component/AppStore";
import Box from "@component/Box";
import Button from "@component/buttons/Button";
import Card from "@component/Card";
import Container from "@component/Container";
import FlexBox from "@component/FlexBox";
import Icon from "@component/icon/Icon";
import Navbar from "@component/navbar/Navbar";
import useWindowSize from "@hook/useWindowSize";
import { theme } from "@utils/theme";

import {
  addToFavorite,
  removeToFavorite,
  useFavorete,
} from "@services/api/newspaper/favorite";

import { AuthCotext } from "@context/AuthContext";

import Typography, { H3 } from "../Typography";
import { StyledSingle } from "./SingleStyle";

export interface ISingle {
  title: string;
  brTitle: string;
  editionName: string;
  currentEditionId: string;
  editionPublicatedAt: string;
  editionImage: string;
  favorite: boolean;
  publisherId?: number;
}

const Single: React.FC<ISingle> = ({
  title,
  brTitle,
  editionName,
  currentEditionId,
  editionImage,
  editionPublicatedAt,
  favorite,
  publisherId,
}) => {
  const router = useRouter();
  const { isAuthenticated } = useContext(AuthCotext);
  const [favorited, setFavorited] = useState<boolean>(false);
  const { data: isFavorite } = useFavorete(publisherId);
  const message = "Você precisa estar logado para completar esta ação";
  const [width] = useWindowSize();

  useEffect(() => {
    if (favorite) {
      setFavorited(!!isFavorite);
    }
  }, [favorite, isFavorite]);

  const handleFavoriteClick = async () => {
    if (!isAuthenticated) {
      toast.warning(message);
      router.push("/signin");
    } else {
      setFavorited((current) => {
        if (!current) addToFavorite(publisherId);
        else removeToFavorite(publisherId);

        return !current;
      });
    }
  };

  const handleReadClick = useCallback(() => {
    if (!isAuthenticated) {
      toast.warning(message);
      router.push("/signin");
    } else {
      window.open(
        `${process.env.NEXT_PUBLIC_BASE_READER_URL}/reader/${currentEditionId}`,
        "_blank"
      );
    }
  }, [currentEditionId, isAuthenticated, router]);

  return (
    <>
      <Navbar />
      <Box bg="gray.white" mb="3.75rem">
        <Container pb="2rem">
          <StyledSingle>
            <div>
              <h1 className="title">
                {title}
                <br /> {brTitle}
                <br /> {editionName}
              </h1>
              <Box color="white" p="10px 0px">
                <Button
                  mb="1.65rem"
                  variant="contained"
                  bg={theme.colors.primary[500]}
                  color="primary"
                  size="large"
                  type="submit"
                  data-cy="ler-agora"
                  onClick={handleReadClick}
                >
                  Ler agora
                </Button>
              </Box>
              <Typography color="secondary.main" mb="1.35rem">
                Leia também no seu celular
              </Typography>
              <AppStore />
            </div>
            {favorite ? (
              <div className="image">
                {width < 570 ? (
                  <>
                    <Card position="relative">
                      <NextImage height={360} width={200} src={editionImage} />
                    </Card>
                    <H3 fontSize="12px" mt="1rem" mb="0.5rem">
                      {editionName}
                    </H3>
                    <Typography mt="2px" color="secondary.main">
                      {editionPublicatedAt}
                    </Typography>
                    <FlexBox cursor="pointer" onClick={handleFavoriteClick}>
                      <Icon
                        defaultcolor={favorited ? "currentColor" : "auto"}
                        size="20px"
                        ml="120px"
                        mt="-25px"
                      >
                        favorite
                      </Icon>
                    </FlexBox>
                  </>
                ) : (
                  <>
                    <Card p="10rem" mr={50} position="relative">
                      <NextImage
                        height={100}
                        width={100}
                        src={editionImage}
                        layout="fill"
                      />
                    </Card>
                    <FlexBox flexWrap="wrap">
                      <H3 fontSize="20px" mt="1rem" mb="0.5rem" ml="0.5rem">
                        {editionName}
                      </H3>
                      <FlexBox
                        p="8px 60px"
                        m="1rem"
                        cursor="pointer"
                        onClick={handleFavoriteClick}
                      >
                        <Icon
                          defaultcolor={favorited ? "currentColor" : "auto"}
                          size="30px"
                        >
                          favorite
                        </Icon>
                      </FlexBox>
                    </FlexBox>
                    <Typography mt="-2rem" color="secondary.main" ml="0.5rem">
                      {editionPublicatedAt}
                    </Typography>
                  </>
                )}
              </div>
            ) : (
              <div className="image">
                {width < 570 ? (
                  <>
                    <Card position="relative">
                      <NextImage height={360} width={200} src={editionImage} />
                    </Card>
                    <H3 fontSize="12px" mt="1rem" mb="0.5rem">
                      {editionName}
                    </H3>
                    <Typography color="secondary.main">
                      {editionPublicatedAt}
                    </Typography>{" "}
                  </>
                ) : (
                  <>
                    <Card p="10rem" mr={50} position="relative">
                      <NextImage
                        height={100}
                        width={100}
                        src={editionImage}
                        layout="fill"
                      />
                    </Card>
                    <H3 fontSize="20px" mt="1rem" mb="0.5rem" ml="0.5rem">
                      {editionName}
                    </H3>
                    <Typography color="secondary.main" ml="0.5rem">
                      {editionPublicatedAt}
                    </Typography>{" "}
                  </>
                )}
              </div>
            )}
          </StyledSingle>
        </Container>
      </Box>
    </>
  );
};

export default Single;
