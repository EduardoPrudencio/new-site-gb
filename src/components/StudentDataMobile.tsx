/* eslint-disable no-unsafe-optional-chaining */
import { useRouter } from "next/router";

import React, { useContext } from "react";

import Icon from "@component/icon/Icon";
import Image from "@component/Image";
import moment from "moment";
import styled from "styled-components";

import NivelService from "@services/NivelService";

import { AuthCotext } from "@context/AuthContext";

import Box from "./Box";
import Button from "./buttons/Button";
import Typography from "./Typography";

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
const ActiveStatus = styled.label`
  font-size: 14px;
  color: #52be80;
  margin-right: 10px;
  font-weight: bold;
`;

const InactiveStatus = styled(ActiveStatus)`
  color: #ff0000;
`;

interface IProps {
  student: any;
}

const StudentDataMobile: React.FC<IProps> = ({ student }) => {
  const dates = student?.niveis.map((d) => d.date).sort();

  const { logOut } = useContext(AuthCotext);
  const router = useRouter();

  const lastLevelReceived =
    student?.niveis !== null && student.niveis.length > 0
      ? student?.niveis.find(
          (l) => l.date === dates[student?.niveis.length - 1]
        ).value
      : 1;

  const maxLevel = lastLevelReceived - 1;

  const LogOut = () => {
    logOut();
    router.reload();
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignSelf="start"
      width="95%"
      margin="10px"
      alignItems="center"
      justifyContent="center"
      marginTop="-100px"
    >
      <Line>
        <Label>{`${student?.name} ${student?.lastName}`}</Label>
      </Line>
      <Line>
        <LabelTitle>Status:</LabelTitle>
        {student?.paymentStatus === 0 ? (
          <ActiveStatus>Ativo</ActiveStatus>
        ) : (
          <InactiveStatus>Inativo</InactiveStatus>
        )}
        <Typography color="#cecece">Frequência</Typography>
        <Typography fontWeight="bold" fontSize="18px" marginLeft="5px">
          {student?.frequencyPercentage}%
        </Typography>
        <Button onClick={LogOut}>Sair</Button>
      </Line>
      <Line>
        <LabelTitle>Graduação:</LabelTitle>
        <Image src={NivelService(maxLevel)} height="20px" />
      </Line>
      <Line>
        <Icon size="17px" color="#868b8f">
          gps
        </Icon>
        <SmallLabel>
          {student?.address?.cidade} - {student?.address?.uf}
        </SmallLabel>
      </Line>
      <Line>
        <Icon size="17px" color="#868b8f" marginRight="5px">
          birthday
        </Icon>
        <SmallLabel>
          {moment(student?.birthDate).format("DD/MM/YYYY")}
        </SmallLabel>
      </Line>

      <Box
        width="100%"
        color="#cecece"
        borderTop="solid 1px #cecece"
        marginTop="10px"
        marginLeft="-5px"
      />

      <Line>
        <LabelTitle>Endereço:</LabelTitle>
        <SmallLabel>{student?.address?.endereco}</SmallLabel>
      </Line>

      <Line>
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
    </Box>
  );
};

export default StudentDataMobile;
