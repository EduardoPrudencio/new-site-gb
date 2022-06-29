import NextImage from "next/image";
import Link from "next/link";

import React, { useContext } from "react";

import Box from "@component/Box";
import Card from "@component/Card";
import FlexBox from "@component/FlexBox";
import { H4, Tiny } from "@component/Typography";
import useWindowSize from "@hook/useWindowSize";
import { theme } from "@utils/theme";

import { AuthCotext } from "@context/AuthContext";

import Premium from "../../../public/assets/images/icons/premium.svg";
import { colors } from "../../utils/themeColors";

export interface ICommonCardProps {
  isMagazine: boolean;
  publicatedAt: string;
  coverUrl: string;
  thumbCover: string;
  publisherName: string;
  premium: boolean;
  tags: string[];
  link: string;
}

const CommonCard: React.FC<ICommonCardProps> = ({
  isMagazine = false,
  publicatedAt,
  coverUrl,
  thumbCover,
  publisherName,
  premium,
  tags,
  link,
}) => {
  const { user, isAuthenticated } = useContext(AuthCotext);
  const [width] = useWindowSize();

  function truncateTitle(title: string, length) {
    if (title.length <= length) return title;
    return `${title.substring(0, length)}...`;
  }

  return (
    <Card
      p="1rem"
      minWidth={160}
      minHeight={260}
      maxWidth={width < 570 ? 160 : 300}
      maxHeight={width < 570 ? 200 : 400}
    >
      <Link href={link}>
        <a>
          <NextImage
            src={coverUrl}
            width={100}
            height={100}
            layout="responsive"
            alt={publisherName}
            blurDataURL={thumbCover}
            placeholder="blur"
          />
          <FlexBox justifyContent="space-between">
            <Box
              display="flex"
              width="100%"
              alignItems="center"
              justifyContent="center"
            >
              <Tiny mr="0.5rem">{tags?.join(" - ")}</Tiny>
            </Box>
          </FlexBox>
          <Box
            display="flex"
            flexDirection="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Box display="flex" flexDirection="column" alignItems="start">
              <H4 fontWeight="bold" fontSize="16px" mb="0.25rem">
                {(user && !user.premium && (premium || isMagazine)) ||
                (!user && premium)
                  ? truncateTitle(publisherName, 18)
                  : truncateTitle(publisherName, 24)}
              </H4>
              <FlexBox>
                <H4
                  fontWeight="400"
                  fontSize="16px"
                  color={colors.text.hint}
                  mr="0.5rem"
                >
                  {publicatedAt}
                </H4>
              </FlexBox>
            </Box>
            {isAuthenticated && !user?.premium && premium && (
              <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                borderRadius="5px"
                width="1.6rem"
                height="1.6rem"
                alignSelf="end"
                p={1}
                bg={theme.colors.primary[300]}
              >
                <NextImage src={Premium} alt="" />
              </Box>
            )}
          </Box>
        </a>
      </Link>
    </Card>
  );
};

export default CommonCard;
