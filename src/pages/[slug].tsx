import AppLayout from "@component/layout/AppLayout";
import { H5 } from "@component/Typography";

import Section1 from "@component/Section1";
import { useRouter } from "next/router";
import { setCookies } from "cookies-next";
import { gyns } from "@services/GymManager";
import { PageSession } from "@component/PageSession";

function IndexPage() {
  const { query } = useRouter();
  const { slug } = query;
  const gym = gyns.find((g) => g.slug === slug);

  if (typeof gym !== "undefined") {
    setCookies("gym.name", `${slug}`, {
      maxAge: 60 * 60 * 24 * 30, // 1 month
    });
  }

  return (
    <main>
      {typeof gym !== "undefined" ? (
        <Section1 title={gym.name} />
      ) : (
        <Section1 />
      )}

      <PageSession height="500px" backgroundColor="#0F3380" />
      <PageSession height="500px">
        <H5 fontSize="22px">Como chegar</H5>
        <iframe
          title="Endereço da academia"
          src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d4219.53868200185!2d-41.32479536376152!3d-21.7691521184006!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xfb1f51e72dc0c5db!2sGracie%20Barra%20Campos%20dos%20Goytacazes!5e0!3m2!1sen!2sbr!4v1654004093875!5m2!1sen!2sbr"
          width="500"
          height="350"
          loading="lazy"
        />
      </PageSession>
    </main>
  );
}

IndexPage.layout = AppLayout;

export default IndexPage;
