import AppLayout from "@component/layout/AppLayout";
import { H5 } from "@component/Typography";

import Section1 from "@component/Section1";
import { useRouter } from "next/router";
import { setCookies } from "cookies-next";
import { gyns } from "@services/GymManager";
import { PageSession } from "@component/PageSession";
import styled from "styled-components";

const BoxBenificios = styled.div`
  background: rgba(255, 255, 255, 0.15);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.18);
  padding: 30px;
`;

const BenificiosTitulo = styled.label`
  color: #c6c0c0;
  font-weight: bold;
  font-size: 21px;
`;

const BenificiosItem = styled.li`
  color: #c6c0c0;
  font-size: 15px;
`;

const BoxPageSection = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  background-image: url(assets/images/logo-bg-pb.png);
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  width: 1200px;
  height: 500px;
`;

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

      <PageSession height="500px" backgroundColor="#0F3380">
      <BoxPageSection>
          <img
            src="/assets/images/carlos-gracie.png"
            alt="apple-watch-1"
            width="350"
          />
          <BoxBenificios>
            <BenificiosTitulo>Alguns benefícios do Jiu-Jitsu</BenificiosTitulo>
            <ul>
              <BenificiosItem>Combate a ansiedade e o estresse</BenificiosItem>
              <BenificiosItem>Disciplina</BenificiosItem>
              <BenificiosItem>Defesa pessoal</BenificiosItem>
              <BenificiosItem>Define o corpo</BenificiosItem>
              <BenificiosItem>Contribui com a saúde do coração</BenificiosItem>
              <BenificiosItem>Melhora o condicionamento físico</BenificiosItem>
              <BenificiosItem>
                Socializa e traz qualidade à alimentação
              </BenificiosItem>
            </ul>
          </BoxBenificios>
        </BoxPageSection>
      </PageSession>
      <PageSession height="500px">
        <H5 fontSize="22px">Como chegar</H5>
        <iframe
          title="Endereço da academia"
          src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d4219.53868200185!2d-41.32479536376152!3d-21.7691521184006!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xfb1f51e72dc0c5db!2sGracie%20Barra%20Campos%20dos%20Goytacazes!5e0!3m2!1sen!2sbr!4v1654004093875!5m2!1sen!2sbr"
          width="350"
          height="300"
          loading="lazy"
        />
      </PageSession>
    </main>
  );
}

IndexPage.layout = AppLayout;

export default IndexPage;
