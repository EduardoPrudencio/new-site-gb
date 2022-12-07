import React, { useContext, useEffect, useState } from "react";
import Modal from "react-modal";
import { useRouter } from "next/router";

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

import Alert from "../../components/alert";
import { Presences as listOfPresence } from "../../types";

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

const AreaButtons = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const LabelDelete = styled.label`
  margin-left: -6px;
  &:hover {
    color: #ff0000;
  }
`;

const LabelDone = styled(LabelDelete)`
  &:hover {
    color: #00ff00;
  }
`;

function Presences() {
  const router = useRouter();

  const [presences, setPresences] = useState<listOfPresence[]>();
  const { user } = useContext(AuthCotext);
  const [hasError, setHasError] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState("");

  const CloseModalWithReload = (value) => {
    setShowModal(value);
    router.reload();
  };

  const ConfirmStudentPresence = async (userId, presenceId) => {
    const result = await ConfirmPresence(userId, presenceId);

    if (result.statusCode === 201) {
      setHasError(false);
      setMessage("Solicitação de presença aceita!");
    } else {
      setMessage("Ocorreu um erro na tentativa de aceitar essa solicitação");
      setHasError(true);
    }

    setShowModal(true);
  };

  const RefuseStudentPresence = async (userId, presenceId) => {
    const result = await RefusePresence(userId, presenceId);

    if (result.statusCode === 201) {
      setHasError(false);
      setMessage("Solicitação de presença recusada!");
    } else {
      setMessage("Ocorreu um erro na tentativa de rejeitar essa solicitação");
      setHasError(true);
    }

    setShowModal(true);
  };

  useEffect(() => {
    const GetPresences = async () => {
      const list = await GetAllPresences();
      setPresences(list.data.data);
    };
    GetPresences();
  }, []);

  return (
    <>
      <Modal isOpen={showModal} style={modalStyles}>
        {/* <Spinner color="#FF0000"/> */}
        <Alert
          Exec={CloseModalWithReload}
          ValueToExec={false}
          Error={hasError}
          Message={message}
        />
      </Modal>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        width="100%"
        minHeight="500px"
        paddingBottom="20px"
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
                borderRadius="5px"
                paddingLeft="10px"
                marginTop="10px"
              >
                <h3>{pr.studentName}</h3>
                <AreaButtons>
                  <Button
                    onClick={() => ConfirmStudentPresence(user.id, pr.id)}
                  >
                    <ConfirmPresenceStyle>
                      <Icon mr="10px" size="12px">
                        done
                      </Icon>
                      <LabelDone>Aceitar</LabelDone>
                    </ConfirmPresenceStyle>
                  </Button>
                  <Button onClick={() => RefuseStudentPresence(user.id, pr.id)}>
                    <ConfirmPresenceStyle>
                      <Icon mr="10px" size="16px">
                        delete
                      </Icon>
                      <LabelDelete>Rejeitar</LabelDelete>
                    </ConfirmPresenceStyle>
                  </Button>
                </AreaButtons>
              </Box>
            ))}
          </Box>
        ))}
      </Box>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = onlyAuth(async () => {
  return {
    props: {},
  };
});

Presences.layout = AppLayout;
export default Presences;
