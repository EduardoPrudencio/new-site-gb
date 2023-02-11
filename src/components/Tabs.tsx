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

  const imagesCt = [
    {
      img: "ct/sede-03.jpg",
      title: "Equipe Gracie Barra",
    },
    {
      img: "ct/sede-02.jpg",
      title: "Equipe Gracie Barra",
    },
    {
      img: "ct/sede-01.jpg",
      title: "Equipe Gracie Barra",
    },
    {
      img: "ct/sede-04.webp",
      title: "Equipe Gracie Barra",
    },
    {
      img: "ct/sede-05.jpg",
      title: "Equipe Gracie Barra",
    },
  ];

  const imagesDonana = [
    {
      img: "donana/donana-01.jpg",
      title: "Equipe Gracie Barra",
    },
    {
      img: "donana/donana-02.jpg",
      title: "Equipe Gracie Barra",
    },
    {
      img: "donana/donana-03.jpg",
      title: "Equipe Gracie Barra",
    },
    {
      img: "donana/donana-04.jpg",
      title: "Equipe Gracie Barra treinando",
    },
    {
      img: "donana/donana-05.jpg",
      title: "Equipe Gracie Barra treinando",
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
            <Tab label="Parque Rosário" {...a11yProps(0)} />
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
            <StandardImageList list={imagesCt} />

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
            <StandardImageList list={imagesDonana} />
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
