import AppLayout from "@component/layout/AppLayout";
import { H5 } from "@component/Typography";

import Section1 from "@component/Section1";
import { useRouter } from "next/router";
import { setCookies } from "cookies-next";
import { gyns } from "@services/GymManager";
import { PageSession } from "@component/PageSession";
import styled from "styled-components";

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


const TextContetn = styled.p`
  color: #cecece;
  font-size: 19px;
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
  margin-top: -27px;
  width: 1150px;
  height:390px;
`;

const BoxPageSection = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  margin-top: 100px;
  width: 1150px;
  height:390px;
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

      <PageSession height="450px" backgroundColor="#0F3380">
        <BoxPageSectionWithBackgroundImage>
          <img
            src="/assets/images/carlos-gracie.png"
            alt="apple-watch-1"
            width="350"
          />
          <BoxTransparent>
            <Titulo>Carlos Gracie Jr.</Titulo>
            <TextContetn>
              “Minha vida é dedicada ao Jiu-Jitsu. 
              <br />Meu objetivo sempre foi construir uma irmandade para 
              <br />liderar a expansão do Jiu-Jitsu, respeitando sempre 
              <br />a essência da nossa arte. 
              Meus alunos são uma extensão da 
              <br />minha família.”
            </TextContetn>
          </BoxTransparent> 
        </BoxPageSectionWithBackgroundImage>
      </PageSession>

      <PageSession height="500px">
        <BoxPageSection>
          <BoxTransparent>
            <Titulo>Escola Gracie Barra</Titulo>
            <TextContetn>
            Gracie Barra é uma comunidade mundial de instrutores,
            <br />estudantes e atletas do Jiu-Jitsu. Nossa organização 
            <br />é constituída por mais de 700 escolas em 
            <br />seis continentes.
            </TextContetn>
          </BoxTransparent>

          <img
            src="https://i.pinimg.com/564x/53/00/97/53009755adb5a5849bf5e763f6d69f88.jpg"
            alt="apple-watch-1"
            width="680"
          /> 
        </BoxPageSection>
      </PageSession>


      <PageSession height="750px" >
        <BoxPageSection>
        <img
            src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/e4423861-afaf-44cc-82f2-928db4511726/d6gkvqk-11254c7b-3a27-4ed4-8efe-46c42250fe77.jpg/v1/fill/w_1024,h_975,q_75,strp/judo003_by_amartires_d6gkvqk-fullview.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9OTc1IiwicGF0aCI6IlwvZlwvZTQ0MjM4NjEtYWZhZi00NGNjLTgyZjItOTI4ZGI0NTExNzI2XC9kNmdrdnFrLTExMjU0YzdiLTNhMjctNGVkNC04ZWZlLTQ2YzQyMjUwZmU3Ny5qcGciLCJ3aWR0aCI6Ijw9MTAyNCJ9XV0sImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS5vcGVyYXRpb25zIl19.dMHnUm_mmsezCmYw-0IVGLGhln3Aku7dRjwkjp-y8ys"
            alt="apple-watch-1"
            width="580"
          /> 
          <BoxTransparent>
            <Titulo>Nosso Programa</Titulo>
            <TextContetn>
              A estrutura das aulas é a marca registrada 
              <br />de todas as escolas Gracie Barra.<br /> 
              As aulas começam na hora marcada e seguem uma
              <br />estrutura curricular padronizada. Como aluno,
              <br />você terá uma clara concepção do que é 
              <br />esperado para você, e saberá o que esperar
              <br />dos professores e parceiros de treino.
              <br />A consistência dessa estrutura combinada 
              <br />com a criatividade e inovação de nossos 
              <br />dedicados professores misturam-se perfeitamente
              <br />para facilitar o seu progresso.
            </TextContetn>
          </BoxTransparent>
        </BoxPageSection>
      </PageSession>

      
      <PageSession height="500px" backgroundColor="#a21912">
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
