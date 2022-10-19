import * as React from "react";

import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";

type ImageProps = {
  img: string;
  title: string;
};

type ImageListProps = {
  list: ImageProps[];
};

const StandardImageList: React.FC<ImageListProps> = ({ list }) => {
  return (
    <ImageList sx={{ width: 500, height: 450 }} cols={3} rowHeight={164}>
      {list.map((item) => (
        <ImageListItem key={item.img}>
          <img
            src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
            srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
            alt={item.title}
            loading="lazy"
          />
        </ImageListItem>
      ))}
    </ImageList>
  );
};

export default StandardImageList;
