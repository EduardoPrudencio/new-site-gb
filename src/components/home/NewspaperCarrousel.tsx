import React, { useEffect, useState } from "react";

import Box from "@component/Box";
import Carousel from "@component/carousel/Carousel";
import useWindowSize from "@hook/useWindowSize";

import CategorySectionCreator from "../CategorySectionCreator";
import NewspaperCard, {
  INewspapersData,
} from "../newspaper-card/newspaperCard";

export interface INewspaperCarrouselProps {
  title?: string;
  data: INewspapersData[];
}

const NewspaperCarrousel: React.FC<INewspaperCarrouselProps> = ({
  title,
  data,
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
    <CategorySectionCreator title={title} seeMoreLink="/jornais">
      <Box my="-0.25rem">
        <Carousel
          totalSlides={data.length}
          infinite
          visibleSlides={visibleSlides}
        >
          {data.map((item) => (
            <Box py="0.25rem" key={item.id}>
              <NewspaperCard card={item} />
            </Box>
          ))}
        </Carousel>
      </Box>
    </CategorySectionCreator>
  );
};

export default NewspaperCarrousel;
