import Box from "@component/Box";
import Icon from "@component/icon/Icon";
import AppLayout from "@component/layout/AppLayout";
import Navbar from "@component/navbar/Navbar";
import styled from "styled-components";
import Image from "@component/Image";

const ContentTop = styled.div`
    display: flex;
    flex-direction: column;
    align-items: start;
    justify-content: start;
    padding-top: 20px;
    width: 100%;
    height: 210px;
    border-bottom: solid 1px #cecece;
`;

const NameAndCity = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`;

const Name = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin-right: 30px;
`;

const City = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 205px;
`;

const KeyValue = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin-top: 20px;
    min-width: 150px;
`;

const Graduacao = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin-top: 20px;
    min-width: 230px;
`;

const DoubleColumn = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    min-width: 420px;
`;


const RedesSociais = styled.div`
    display: flex;
    flex-direction: row;
    align-items: start;
    justify-content: start;
    margin-top: 20px;
    width: 100%;
`;

const ContentBottom = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 370px;
    background-color: #FFFFFF;
`;

const ImageUserBox = styled.div`
    display: flex;
    margin-top: 10px;
    flex-direction: column;
    border-bottom: solid 1px #cecece;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    width: 80%;
    height: 200px;
    background-color: #FFFFFF;
`;
const Label = styled.label`
    font-size: 21px;
    font-weight: bold;
    color: #868b8f;
`;

const SmallLabel = styled.label`
    font-size: 14px;
    color: #cecece;
`;

function Perfil() {
    return (
    <>
      <Navbar/>
      <Box
        display="flex"
        flexDirection="row"
        alignItems="center"
        justifyContent="center"
        marginTop="20px"
      >
        <Box
          display="flex"
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between"
          bg="#FFFFFF"
          width="1000px"
        >
          {/* SIDEBAR */}
          <Box
           display="flex"
           flexDirection="column"
           alignItems="center"
           justifyContent="start"
           width="350px"
           height="600px"
          >
            <ImageUserBox>
                <Icon size="100px">user</Icon>
            </ImageUserBox>
          </Box>
          {/* SIDEBAR */}
          {/* CONTENT */}
          <Box
           display="flex"
           flexDirection="column"
           alignItems="center"
           justifyContent="center"
           width="100%"
           height="600px"
          >
            <ContentTop>
                <NameAndCity>
                    <Name>
                      <Label>Fulano da Silva</Label>
                    </Name>
                  <City>
                    <Icon size="17px" color="#868b8f">gps</Icon>
                    <SmallLabel>Campos dos Goytacazes - RJ</SmallLabel>
                  </City>
                </NameAndCity>

                <DoubleColumn>
                  <KeyValue>
                    <Icon size="17px" color="#868b8f">birthday</Icon>
                    <SmallLabel>25 de Maio de 1992</SmallLabel>
                  </KeyValue>
                  <Graduacao>
                    <SmallLabel>Graduação:</SmallLabel>
                    <Image src="/assets/images/faixas/preta/preta_ponta_tres.png" height="20px"/>
                  </Graduacao>
                </DoubleColumn>

                <KeyValue>
                  <Icon size="17px" color="#868b8f">email</Icon>
                  <SmallLabel>fulano@email.com</SmallLabel>
                </KeyValue>
                <RedesSociais>
                  <Box
                    display="flex"
                    flexDirection="row"
                    alignItems="center"
                    justifyContent="space-between"
                    width="100px"
                  >
                    <a
                      href="#"
                      target="_blank"
                      rel="noreferrer"
                      key="facebook"
                    >
                      <Icon size="25px" defaultcolor="auto">facebook-2</Icon>
                    </a>
                    <a
                      href="#"
                      target="_blank"
                      rel="noreferrer"
                      key="facebook"
                    >
                      <Icon size="25px" defaultcolor="auto">instagram-2</Icon>
                    </a>
                    <a
                      href="#"
                      target="_blank"
                      rel="noreferrer"
                      key="facebook"
                    >
                      <Icon size="25px" defaultcolor="auto">twitter-2</Icon>
                    </a>
                  </Box>
                </RedesSociais>
            </ContentTop>
            <ContentBottom>
              
            </ContentBottom>
          </Box>
          {/* CONTENT */}
        </Box>
      </Box>
    </>
    );
}

Perfil.layout = AppLayout;

export default Perfil;