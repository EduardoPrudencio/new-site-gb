import NextImage, { ImageProps } from "next/image";
import Link from "next/link";

import React from "react";

import Box from "@component/Box";
import Carousel, { CarouselProps } from "@component/carousel/Carousel";
import { H2 } from "@component/Typography";
import { imageKitURL } from "@utils/imageKitURL";

type ICarouselWithTitleProps = {
  title?: string;
  carouselProps?: CarouselProps;
  children?: React.ReactNode;
  imageProps?: Partial<ImageProps>;
  images: {
    id: number;
    url: string;
    link?: string;
    publicated_at: string;
  }[];
};

export const CarouselWithTitle: React.FC<ICarouselWithTitleProps> = ({
  title,
  images,
  carouselProps,
  imageProps,
  children,
}) => {
  const thumbUrl = (imageUrl: string) =>
    imageKitURL(imageUrl, { width: "50", height: "50" });

  return (
    <>
      {children}
      {title && <H2 mb="2rem">{title}</H2>}
      <Box>
        <Carousel {...carouselProps} totalSlides={images.length}>
          {images.map((image) => (
            <Link href={image.link || "/"} key={image.id}>
              <a>
                <NextImage
                  {...imageProps}
                  src={image.url}
                  alt={image.publicated_at}
                  blurDataURL={thumbUrl(image.url)}
                  placeholder="blur"
                />
              </a>
            </Link>
          ))}
        </Carousel>
      </Box>
    </>
  );
};

CarouselWithTitle.defaultProps = {
  carouselProps: {
    visibleSlides: 3,
    infinite: true,
  },
  imageProps: {
    height: 228,
    width: 182,
  },
  title: "",
  children: null,
};
