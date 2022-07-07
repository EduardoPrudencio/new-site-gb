import AppLayout from "@component/layout/AppLayout";
import { H5 } from "@component/Typography";

import Section1 from "@component/Section1";
import Box from "@component/Box";
import { useRouter } from "next/router";
import { setCookies } from "cookies-next";
import { gyns } from "@services/Gym";

function IndexPage() {
  const { query } = useRouter();
  const { slug } = query;

  if(typeof gyns[`${slug}`] !== "undefined") {
    setCookies(`${slug}`, "gym.name", {
      maxAge: 60 * 60 * 24 * 30, // 1 month
    });
  }

  return (
    <main>
      {typeof gyns[`${slug}`] !== "undefined" ? (
        <Section1 title={gyns[`${slug}`].name} />
      ) : (
        <Section1 />
      )}

      <Box
        display="flex"
        flexDirection="row"
        alignItems="center"
        justifyContent="center"
        width="100%"
        paddingBottom="2rem"
      >
        <Box
          display="flex"
          flexDirection="row"
          alignItems="center"
          justifyContent="space-arround"
          width="1050px"
        >
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
          >
            <H5 fontSize="22px">Como chegar</H5>
            <iframe
              title="Endereço da academia"
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d4219.53868200185!2d-41.32479536376152!3d-21.7691521184006!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xfb1f51e72dc0c5db!2sGracie%20Barra%20Campos%20dos%20Goytacazes!5e0!3m2!1sen!2sbr!4v1654004093875!5m2!1sen!2sbr"
              width="500"
              height="350"
              loading="lazy"
            />
          </Box>
        </Box>
      </Box>
    </main>
  );
}

IndexPage.layout = AppLayout;

export default IndexPage;
