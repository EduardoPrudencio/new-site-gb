/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable no-undef */
import { useState } from "react";
import Modal from "react-modal";

import Icon from "@component/icon/Icon";
import Image from "@component/Image";
import AppLayout from "@component/layout/AppLayout";
import { Button } from "@mui/material";
import { onlyAuth } from "@utils/onlyAuth";
import moment from "moment";
import { GetServerSideProps } from "next";
import styled from "styled-components";

import { AddLevel } from "@services/api/student";
import NivelService from "@services/NivelService";

import Alert from "./alert";

const modalStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    borderRadius: "8px",
    marginRight: "-50px",
    transform: "translate(-50%, -50%)",
  },
};

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

interface IProps {
  student: any;
}

const StudentData: React.FC<IProps> = ({ student }) => {
  // const allLevels =
  //   student?.niveis.length > 0 ? student?.niveis.map((l) => l.value) : [1];
  // const bigestLevel = Math.max(...allLevels);

  const dates = student?.niveis.map((d) => d.date).sort();

  const lastLevelReceived =
    student.niveis.length > 0
      ? student?.niveis.find(
          (l) => l.date === dates[student?.niveis.length - 1]
        ).value
      : 1;

  const [showModal, setShowModal] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [maxLevel, setMaxLevel] = useState(lastLevelReceived - 1);
  const [message, setMessage] = useState("");

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

  const ChangeLevel = async () => {
    const response = await AddLevel(student?.id, maxLevel + 1);

    if (response.statusCode === 200) {
      setHasError(false);
      setMessage("Graduação alterada com sucesso!");
    } else {
      setMessage("Ocorreu um erro e essa mudança não pôde ser executada.");
      setHasError(true);
    }

    setShowModal(true);
  };

  return (
    <>
      <Modal isOpen={showModal} style={modalStyles}>
        {/* <Spinner color="#FF0000"/> */}
        <Alert
          Exec={setShowModal}
          ValueToExec={false}
          Error={hasError}
          Message={message}
        />
      </Modal>
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

        <Line>
          <Button onClick={() => ChangeLevel()}>Salvar</Button>
        </Line>
      </ContentBottom>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = onlyAuth(async () => {
  return {
    props: {},
  };
});

StudentData.layout = AppLayout;

export default StudentData;
