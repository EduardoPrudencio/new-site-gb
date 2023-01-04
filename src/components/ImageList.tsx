/* eslint-disable @next/next/no-img-element */
import * as React from "react";

import styled from "styled-components";

import Box from "./Box";

const ImageBox = styled.div`
  transition: transform 0.2s;
  width: 164px;
  margin: 0 auto;

  &:hover {
    transform: scale(
      3.5
    ); /* (150% zoom - Note: if the zoom is too large, it will go outside of the viewport) */
  }
`;

type ImageProps = {
  img: string;
  title: string;
};

type ImageListProps = {
  list: ImageProps[];
};

const StandardImageList: React.FC<ImageListProps> = ({ list }) => {
  return (
    <Box
      display="flex"
      flexDirection="row"
      flexWrap="wrap"
      alignItems="center"
      justifyContent="center"
      width="500px"
      height="400px"
    >
      {list.map((item) => (
        <ImageBox key={item.img}>
          <img
            src={`/assets/images/${item.img}`}
            alt={item.title}
            width="200px"
          />
        </ImageBox>
      ))}
    </Box>
  );
};

export default StandardImageList;
