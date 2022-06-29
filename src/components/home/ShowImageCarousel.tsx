import Link from "next/link";

import React, { useEffect, useState } from "react";

import Box from "@component/Box";
import { CarouselWithTitle } from "@component/CarouselWithTitle";
import Container from "@component/Container";
import FlexBox from "@component/FlexBox";
import { H2, H6, SemiSpan } from "@component/Typography";
import useWindowSize from "@hook/useWindowSize";
import slugify from "slugify";

import { WrapperCarousels } from "./styles";

export interface IMagazineEdtion {
  id: number;
  name: string;
  tags: string[];
  edition: {
    id: number;
    publicated_at: string;
    cover: string;
  };
}
interface IMagazineCategory {
  category: string;
  category_uuid: string;
  editions: IMagazineEdtion[];
}
export interface IShowImageCarouselProps {
  magazineFeatured: IMagazineCategory;
  secondaryMagazineCategory: IMagazineCategory;
  magazineRelevantCategory: IMagazineCategory;
}

const extractEditions = (edtionsProps: IMagazineCategory) => {
  if (!edtionsProps) return [];
  const { editions = [] } = edtionsProps;

  return editions.map((edition) => {
    const url = slugify(`${edition.id} ${edition.name}`, {
      lower: true,
      locale: "pt",
    });
    const link = `/revistas/${url}/${edition.edition.id}`;
    return {
      ...edition.edition,
      link,
      url: edition.edition.cover,
    };
  });
};

export const ShowImageCarousel: React.FC<IShowImageCarouselProps> = ({
  magazineFeatured,
  secondaryMagazineCategory,
  magazineRelevantCategory,
}) => {
  const [visibleSlides, setVisibleSlides] = useState(3);
  const [width] = useWindowSize();

  const magazineFeaturedEdition = extractEditions(magazineFeatured);
  const secondaryMagazineCategoryEdition = extractEditions(
    secondaryMagazineCategory
  );
  const magazineRelevantCategoryEdition = extractEditions(
    magazineRelevantCategory
  );

  useEffect(() => {
    if (width < 370) setVisibleSlides(1);
    else if (width < 650) setVisibleSlides(2);
    else if (width < 950) setVisibleSlides(3);
    else setVisibleSlides(3);
  }, [width]);

  return (
    <Container>
      <WrapperCarousels>
        <FlexBox flexDirection="column" flex="1" padding="2.5rem">
          <CarouselWithTitle
            images={magazineFeaturedEdition}
            carouselProps={{
              visibleSlides: 1,
              arrowButtonColor: "inherit",
            }}
            imageProps={{
              width: 485,
              height: 651,
              layout: "responsive",
            }}
          >
            <FlexBox
              flexDirection="column"
              justifyContent="center"
              backgroundColor="white"
              padding="2rem"
            >
              <H2 textAlign="center">As melhores revistas</H2>
              <SemiSpan textAlign="center" mt={0}>
                As ultimas publicações das revistas mais renomadas do Brasil
              </SemiSpan>
            </FlexBox>
          </CarouselWithTitle>
        </FlexBox>

        <FlexBox flexDirection="column" flex="1" padding="2.5rem">
          <Box mb="2rem">
            <CarouselWithTitle
              images={magazineRelevantCategoryEdition}
              title="Revistas mais lidas"
              carouselProps={{
                visibleSlides,
              }}
            />
          </Box>

          <Box mb="2rem">
            <CarouselWithTitle
              images={secondaryMagazineCategoryEdition}
              title="TV e Celebridades"
              carouselProps={{
                visibleSlides,
              }}
            />
          </Box>

          <Link href="/revistas">
            <a>
              <H6 textAlign="center" mt="2rem">
                Ver todas as revistas
              </H6>
            </a>
          </Link>
        </FlexBox>
      </WrapperCarousels>
    </Container>
  );
};
