import React, { useContext, useEffect, useState } from "react";

import Button from "@component/buttons/Button";
import Icon from "@component/icon/Icon";
import AppLayout from "@component/layout/AppLayout";
import { Box } from "@mui/material";
import { onlyAuth } from "@utils/onlyAuth";
import moment from "moment";
import { GetServerSideProps } from "next";
import {
  GetAllPresences,
  ConfirmPresence,
  RefusePresence,
} from "services/api/student";
import styled from "styled-components";

import { AuthCotext } from "@context/AuthContext";

import { Presences as listOfPresence } from "../../types";

const PresenceTitle = styled.label`
  font-size: 21px;
  color: #414141;
`;

const DateDistac = styled.label`
  font-size: 21px;
  color: #414141;
`;

const ConfirmPresenceStyle = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const Label = styled.label`
  &:hover {
    color: #ff0000;
  }
`;

function Presences() {
  const ConfirmStudentPresence = async (userId, presenceId) => {
    const result = await ConfirmPresence(userId, presenceId);
    console.log("************************** ", result);
  };

  const RefuseStudentPresence = async (userId, presenceId) => {
    const result = await RefusePresence(userId, presenceId);
    console.log("************************** ", result);
  };

  const [presences, setPresences] = useState<listOfPresence[]>();
  const { user } = useContext(AuthCotext);

  useEffect(() => {
    const GetPresences = async () => {
      const list = await GetAllPresences();
      setPresences(list.data.data);
    };
    GetPresences();
  }, []);

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      width="100%"
    >
      <PresenceTitle>Presences</PresenceTitle>

      {presences?.map((p) => (
        <Box width="1000px">
          <DateDistac>{moment(p.date).format("DD/MM/YYYY")}</DateDistac>
          {p.presences?.map((pr) => (
            <Box
              display="flex"
              flexDirection="row"
              alignItems="center"
              justifyContent="space-between"
              bgcolor="#ffffff"
              width="100%"
            >
              <h3>{pr.studentName}</h3>
              <Button onClick={() => ConfirmStudentPresence(user.id, pr.id)}>
                <ConfirmPresenceStyle>
                  <Icon mr="10px" size="22px">
                    done
                  </Icon>
                  <Label>Aceitar</Label>
                </ConfirmPresenceStyle>
              </Button>
              <Button onClick={() => RefuseStudentPresence(user.id, pr.id)}>
                <ConfirmPresenceStyle>
                  <Icon mr="10px" size="22px">
                    delete
                  </Icon>
                  <Label>Aceitar</Label>
                </ConfirmPresenceStyle>
              </Button>
            </Box>
          ))}
        </Box>
      ))}
    </Box>
  );
}

export const getServerSideProps: GetServerSideProps = onlyAuth(async () => {
  return {
    props: {},
  };
});

Presences.layout = AppLayout;
export default Presences;
