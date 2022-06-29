/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";

import Box from "@component/Box";
import Carousel from "@component/carousel/Carousel";
import MagazineCard, {
  IMagazineEdtion,
} from "@component/magazine-card/MagazineCard";
import useWindowSize from "@hook/useWindowSize";

import CategorySectionCreator from "../CategorySectionCreator";

export interface IMagazineCarrouselProps {
  categoryName?: string;
  editions: IMagazineEdtion[];
}

const MagazineCarrousel: React.FC<IMagazineCarrouselProps> = ({
  categoryName,
  editions,
}) => {
  const [visibleSlides, setVisibleSlides] = useState(4);
  const [width] = useWindowSize();

  useEffect(() => {
    if (width < 370) setVisibleSlides(1);
    else if (width < 650) setVisibleSlides(2);
    else if (width < 950) setVisibleSlides(3);
    else setVisibleSlides(4);
  }, [width]);

  return (
    <CategorySectionCreator title={categoryName}>
      <Box my="-0.25rem">
        <Carousel
          totalSlides={editions.length}
          infinite
          visibleSlides={visibleSlides}
        >
          {editions.map(({ id, edition, name, tags }) => (
            <Box py="0.25rem" key={id}>
              <MagazineCard id={id} edition={edition} name={name} tags={tags} />
            </Box>
          ))}
        </Carousel>
      </Box>
    </CategorySectionCreator>
  );
};

export default MagazineCarrousel;
