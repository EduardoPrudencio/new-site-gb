import { useRouter } from "next/router";

import Box from "@component/Box";
import AppLayout from "@component/layout/AppLayout";
import { PageSession } from "@component/PageSession";
import PageSessionGradientBackground from "@component/PageSessionGradientBackground";
import Section1 from "@component/Section1";
import BasicTabs from "@component/Tabs";
import { H5 } from "@component/Typography";
import { setCookies } from "cookies-next";
import styled from "styled-components";

import { gyns } from "@services/GymManager";

const BoxTransparent = styled.div`
  background: rgba(255, 255, 255, 0.15);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.18);
  padding: 30px;
`;

const Titulo = styled.label`
  color: #c6c0c0;
  font-weight: bold;
  font-size: 21px;
`;

const TituloAzul = styled(Titulo)`
  color: #213a5b;
`;

const TextContent = styled.p`
  color: #cecece;
  font-size: 19px;
`;

const TextContentGray = styled(TextContent)`
  color: #494949;
`;

const BoxPageSectionWithBackgroundImage = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  background-image: url(assets/images/logo-bg-pb.png);
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  width: 1150px;
  height: 400px;
`;

const BoxPageSection = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  width: 1150px;
  height: 400px;
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

      <PageSessionGradientBackground
        height={400}
        backgroundColor="rgb(80,122,176)"
        backgroundRadial="radial-gradient(circle, rgba(80,122,176,1) 0%, rgba(33,58,91,1) 68%)"
      >
        <BoxPageSectionWithBackgroundImage>
          <img
            src="/assets/images/carlos-gracie.png"
            alt="apple-watch-1"
            width="350"
          />
          <BoxTransparent>
            <Titulo>Carlos Gracie Jr.</Titulo>
            <TextContent>
              “Minha vida é dedicada ao Jiu-Jitsu.
              <br />
              Meu objetivo sempre foi construir uma irmandade para
              <br />
              liderar a expansão do Jiu-Jitsu, respeitando sempre
              <br />
              a essência da nossa arte. Meus alunos são uma extensão da
              <br />
              minha família.”
            </TextContent>
          </BoxTransparent>
        </BoxPageSectionWithBackgroundImage>
      </PageSessionGradientBackground>

      {/* <PageSession height="400px" backgroundColor="rgb(80,122,176)">
        <BoxPageSectionWithBackgroundImage>
          <img
            src="/assets/images/carlos-gracie.png"
            alt="apple-watch-1"
            width="350"
          />
          <BoxTransparent>
            <Titulo>Carlos Gracie Jr.</Titulo>
            <TextContent>
              “Minha vida é dedicada ao Jiu-Jitsu.
              <br />
              Meu objetivo sempre foi construir uma irmandade para
              <br />
              liderar a expansão do Jiu-Jitsu, respeitando sempre
              <br />
              a essência da nossa arte. Meus alunos são uma extensão da
              <br />
              minha família.”
            </TextContent>
          </BoxTransparent>
        </BoxPageSectionWithBackgroundImage>
      </PageSession> */}

      <PageSession height="500px">
        <BoxPageSection>
          <BoxTransparent>
            <TituloAzul>Escola Gracie Barra</TituloAzul>
            <TextContentGray>
              Gracie Barra é uma comunidade mundial de instrutores,
              <br />
              estudantes e atletas do Jiu-Jitsu. Nossa organização
              <br />
              é constituída por mais de 700 escolas em
              <br />
              seis continentes.
            </TextContentGray>
          </BoxTransparent>

          <img
            src="assets/images/jiu-jitsu-img-01.png"
            alt="apple-watch-1"
            width="450"
          />
        </BoxPageSection>
      </PageSession>

      <PageSession height="550px">
        <BoxPageSection>
          <img
            src="assets/images/jiu-jitsu-img-02.png"
            alt="apple-watch-1"
            width="500"
          />
          <BoxTransparent>
            <TituloAzul>Nosso Programa</TituloAzul>
            <TextContentGray>
              A estrutura das aulas é a marca registrada
              <br />
              de todas as escolas Gracie Barra.
              <br />
              As aulas começam na hora marcada e seguem uma
              <br />
              estrutura curricular padronizada. Como aluno,
              <br />
              você terá uma clara concepção do que é
              <br />
              esperado para você, e saberá o que esperar
              <br />
              dos professores e parceiros de treino.
              <br />
              A consistência dessa estrutura combinada
              <br />
              com a criatividade e inovação de nossos
              <br />
              dedicados professores misturam-se perfeitamente
              <br />
              para facilitar o seu progresso.
            </TextContentGray>
          </BoxTransparent>
        </BoxPageSection>
      </PageSession>

      <PageSessionGradientBackground
        height={650}
        backgroundColor="rgb(166,18,24)"
        backgroundRadial="radial-gradient(circle, rgba(210,51,58,1) 0%, rgba(149,15,18,1) 68%)"
      >
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
        >
          <H5 color="#fff" fontSize="22px">
            Nossas unidades
          </H5>

          <BasicTabs />
        </Box>
      </PageSessionGradientBackground>
    </main>
  );
}

IndexPage.layout = AppLayout;

export default IndexPage;
