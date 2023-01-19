/* eslint-disable no-undef */
import { useState } from "react";

import Icon from "@component/icon/Icon";
import Image from "@component/Image";
import AppLayout from "@component/layout/AppLayout";
import { Button } from "@mui/material";
import { onlyAuth } from "@utils/onlyAuth";
import moment from "moment";
import { GetServerSideProps } from "next";
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
  const allLevels = student?.niveis.map((l) => l.value);
  const bigestLevel = Math.max(allLevels);

  const [maxLevel, setMaxLevel] = useState(bigestLevel - 1);

  function addLevel() {
    if (maxLevel < 39) {
      setMaxLevel(maxLevel + 1);
    }
  }

  function subLevel() {
    if (maxLevel > 0) {
      setMaxLevel(maxLevel - 1);
    }
  }

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
          <Image src={NivelService(maxLevel)} height="20px" />
          <Button onClick={() => addLevel()}>+</Button>
          <Button onClick={() => subLevel()}>-</Button>
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
      </ContentBottom>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = onlyAuth(async () => {
  return {
    props: {},
  };
});

StudentData.layout = AppLayout;

export default StudentData;
