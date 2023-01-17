/* eslint-disable no-undef */
import Icon from "@component/icon/Icon";
import Image from "@component/Image";
import moment from "moment";
import styled from "styled-components";

import NivelService from "@services/NivelService";

const ContentTop = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: start;
  padding-top: 20px;
  width: 95%;
  height: 210px;
  border-bottom: solid 1px #cecece;
`;

const ContentBottom = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  width: 95%;
  height: 370px;
  background-color: #ffffff;
`;

const Line = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: start;
  margin-top: 25px;
`;

const Label = styled.label`
  font-size: 21px;
  font-weight: bold;
  color: #868b8f;
`;
const LabelTitle = styled.label`
  font-size: 14px;
  color: #494949;
  margin-right: 10px;
`;

const SmallLabel = styled.label`
  font-size: 14px;
  color: #cecece;
  margin-right: 10px;
`;

const Name = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-right: 30px;
`;

const IconBox = styled.div`
  margin-right: 10px;
`;

function StudentData({ student }) {
  const nivelImage = NivelService(student?.niveis[0].value);
  console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAA ", nivelImage);

  return (
    <>
      <ContentTop>
        <Line>
          <Name>
            <Label>{`${student?.name} ${student?.lastName}`}</Label>
          </Name>
          <IconBox>
            <Icon size="17px" color="#868b8f">
              gps
            </Icon>
          </IconBox>
          <SmallLabel>
            {student?.address?.cidade} - {student?.address?.uf}
          </SmallLabel>
        </Line>
        <Line>
          <IconBox>
            <Icon size="17px" color="#868b8f">
              birthday
            </Icon>
          </IconBox>
          <SmallLabel>
            {moment(student?.birthDate).format("DD/MM/YYYY")}
          </SmallLabel>
          <LabelTitle>Graduação:</LabelTitle>
          <Image src={nivelImage} height="20px" />
        </Line>
        <Line>
          <IconBox>
            <Icon size="17px" color="#868b8f">
              email
            </Icon>
          </IconBox>
          <SmallLabel>{student?.email}</SmallLabel>
        </Line>
      </ContentTop>
      <ContentBottom>
        <Line>
          <LabelTitle>Endereço:</LabelTitle>
          <SmallLabel>{student?.address?.endereco}</SmallLabel>
          <LabelTitle>Número:</LabelTitle>
          <SmallLabel>{student?.address?.numero}</SmallLabel>
          <LabelTitle>Complemento:</LabelTitle>
          <SmallLabel>{student?.address?.complemento}</SmallLabel>
        </Line>
        <Line>
          <LabelTitle>Cep:</LabelTitle>
          <SmallLabel>{student?.address?.cep}</SmallLabel>
          <LabelTitle>Bairro:</LabelTitle>
          <SmallLabel>{student?.address?.bairro}</SmallLabel>
        </Line>
        <Line>
          <LabelTitle>Telefone:</LabelTitle>
          <SmallLabel>{student?.phoneNumber}</SmallLabel>
        </Line>
        {/* <Line>
          <Button
            height="10px"
            variant="contained"
            bg={theme.colors.primary.main}
            color="primary"
            maxHeight="25px"
            onClick={() => GoToEdit(student?.id)}
          >
            <Icon mr="10px" size="30px">
              edit
            </Icon>
            Editar
          </Button>
          <Button
            height="10px"
            variant="contained"
            bg={theme.colors.primary.main}
            color="primary"
            maxHeight="25px"
            ml="20px"
            onClick={() => RequestMyPresence(student?.id)}
          >
            <Icon mr="10px" size="30px">
              plus
            </Icon>
            Solicitar Presença
          </Button>
        </Line> */}
      </ContentBottom>
    </>
  );
}

export default StudentData;
