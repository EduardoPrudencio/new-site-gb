import * as React from "react";

import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";

export default function StandardImageList() {

  const itemData = [
    {
      img: "https://d1a3v8txm37nbo.cloudfront.net/image/filename/2110258/x_lg_jB1HxZIVMVEKHVwNgub0gBTu9RSV7iPB.jpg",
      title: "Breakfast",
    },
    {
      img: "https://graciebarracampos.files.wordpress.com/2018/08/gb.jpg",
      title: "Burger",
    },
    {
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ45L02W8H9X4PzF1JQv9gwFrYJITpDuZvWBbd-Caxq7qiuztVaj0-BOpArzo3ZMG5ZBrs&usqp=CAU",
      title: "Camera",
    },
    {
      img: "https://dtda4cv2md3ne.cloudfront.net/image/filename/2110259/x_lg_OSexyukI3hlehfTUaasjtGChjrWCe9it.jpg",
      title: "Coffee",
    },
    {
      img: "https://dtda4cv2md3ne.cloudfront.net/image/filename/2110260/x_lg_1-F0yg0hEZyG0ArwDDRSege3LmDPx0-R.jpg",
      title: "Hats",
    },
  ];

  return (
    <ImageList sx={{ width: 500, height: 450 }} cols={3} rowHeight={164}>
      {itemData.map((item) => (
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
}

