import React from "react";

import useWindowSize from "@hook/useWindowSize";

import Container from "./Container";
import FlexBox from "./FlexBox";
import Grid from "./grid/Grid";
import MagazineCard, { IMagazineEdtion } from "./magazine-card/MagazineCard";
import Navbar from "./navbar/Navbar";
import Newspapercard, { INewspapersData } from "./newspaper-card/newspaperCard";
import Typography from "./Typography";

interface INewspaperMagazineItensProps {
  title: string;
  magazines?: IMagazineEdtion[];
  newspapers?: INewspapersData[];
}

const NewspaperMagazineItens: React.FC<INewspaperMagazineItensProps> = ({
  title,
  magazines = null,
  newspapers = null,
}) => {
  const [width] = useWindowSize();

  return (
    <main>
      <Navbar />
      <Container pl="auto" mb={5}>
        <Typography as="h2">{title}</Typography>
        {width < 570 ? (
          <Grid container spacing={6}>
            {magazines !== null
              ? magazines.map((magazine) => (
                  <FlexBox flexWrap="wrap" m="-0.5rem">
                    <Grid
                      item
                      horizontal_spacing={6}
                      vertical_spacing={8}
                      key={magazine.edition.id}
                    >
                      <MagazineCard
                        id={magazine.id}
                        name={magazine.name}
                        edition={magazine.edition}
                        tags={magazine.tags}
                      />
                    </Grid>
                  </FlexBox>
                ))
              : newspapers.map((newspaper) => (
                  <FlexBox flexWrap="wrap" m="-0.5rem">
                    <Grid
                      item
                      horizontal_spacing={6}
                      vertical_spacing={8}
                      key={newspaper.edition.id}
                    >
                      <Newspapercard card={newspaper} />
                    </Grid>
                  </FlexBox>
                ))}
          </Grid>
        ) : (
          <Grid container spacing={6}>
            {magazines !== null
              ? magazines.map((magazine) => (
                  <Grid item lg={3} key={magazine.edition.id}>
                    <MagazineCard
                      id={magazine.id}
                      name={magazine.name}
                      edition={magazine.edition}
                      tags={magazine.tags}
                    />
                  </Grid>
                ))
              : newspapers.map((newspaper) => (
                  <Grid item lg={3} key={newspaper.edition.id}>
                    <Newspapercard card={newspaper} />
                  </Grid>
                ))}
          </Grid>
        )}
      </Container>
    </main>
  );
};

export default NewspaperMagazineItens;
