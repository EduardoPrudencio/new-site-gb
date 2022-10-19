import * as React from "react";

import Box from "@mui/material/Box";
import { grey } from "@mui/material/colors";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Typography from "@mui/material/Typography";

import StandardImageList from "./ImageList";

interface ITabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: ITabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const outerTheme = createTheme({
    palette: {
      primary: {
        main: grey[100],
      },
    },
  });

  const images = [
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
    <Box sx={{ width: "1200px" }}>
      <ThemeProvider theme={outerTheme}>
        <Box sx={{ borderBottom: 2, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
            textColor="primary"
            indicatorColor="primary"
          >
            <Tab label="Parque São Caetano" {...a11yProps(0)} />
            <Tab label="Donana" {...a11yProps(1)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <Box
            display="flex"
            flexDirection="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <StandardImageList list={images} />

            <iframe
              title="Endereço da academia"
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d4219.53868200185!2d-41.32479536376152!3d-21.7691521184006!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xfb1f51e72dc0c5db!2sGracie%20Barra%20Campos%20dos%20Goytacazes!5e0!3m2!1sen!2sbr!4v1654004093875!5m2!1sen!2sbr"
              width="500"
              height="400"
              loading="lazy"
            />
          </Box>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Box
            display="flex"
            flexDirection="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <StandardImageList list={images} />
            <iframe
              title="Endereço da academia"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3703.8279156934314!2d-41.29190304895807!3d-21.82557880560066!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xbdd62e3f4b1f79%3A0x56036a1d6c94c87c!2sAv.%20Dep.%20Alair%20Ferreira%2C%20307%20-%20Campos%20dos%20Goytacazes%2C%20RJ%2C%2028024-600!5e0!3m2!1sen!2sbr!4v1666116879461!5m2!1sen!2sbr"
              width="500"
              height="400"
              loading="lazy"
            />
          </Box>
        </TabPanel>
      </ThemeProvider>
    </Box>
  );
}
