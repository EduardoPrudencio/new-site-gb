import { useRouter } from "next/router";

import { useEffect, useState } from "react";
import Modal from "react-modal";

import Box from "@component/Box";
import Icon from "@component/icon/Icon";
import Image from "@component/Image";
import AppLayout from "@component/layout/AppLayout";
import Spinner from "@component/Spinner";
import Typography from "@component/Typography";
import { onlyAuth } from "@utils/onlyAuth";
import { theme } from "@utils/theme";
import moment from "moment";
import { GetServerSideProps } from "next";
import styled from "styled-components";
import { User } from "types";

import { GetById, RequestPresence } from "@services/api/student";

import Alert from "../../components/alert";
import Button from "../../components/buttons/Button";

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

const Line = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: start;
  margin-top: 25px;
`;

const LineLoading = styled(Line)`
  justify-content: center;
`;

const IconBox = styled.div`
  margin-right: 10px;
`;

const Name = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-right: 30px;
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

const Label = styled.label`
  font-size: 21px;
  font-weight: bold;
  color: #868b8f;
`;

const SmallLabel = styled.label`
  font-size: 14px;
  color: #cecece;
  margin-right: 10px;
`;

const LabelTitle = styled.label`
  font-size: 14px;
  color: #494949;
  margin-right: 10px;
`;

function Perfil() {
  const { query } = useRouter();
  const { userId } = query;
  const router = useRouter();
  const [student, setStudent] = useState<User>(null);
  const [hasError, setHasError] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState("");

  const GoToEdit = (id: string) => {
    router.push(`/admin/${id}`);
  };

  const RequestMyPresence = async () => {
    const response = await RequestPresence(userId);
    if (response.statusCode === 201) {
      setHasError(false);
      setMessage("Solicitação realizada com sucesso!");
    } else {
      setMessage(
        "Essa solicitação não pôde ser confirmada, talvez uma solicitação já tenha sido feita para esse dia!"
      );
      setHasError(true);
    }

    setShowModal(true);
  };

  useEffect(() => {
    const GetSutentById = async () => {
      const user = await GetById(userId);
      setStudent(user);
    };
    GetSutentById();
  }, []);

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
      <Box
        display="flex"
        flexDirection="row"
        alignItems="center"
        justifyContent="center"
        marginTop="20px"
        marginBottom="30px"
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
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              width="100%"
              marginTop="40px"
            >
              <Box
                mt="20px"
                display="flex"
                flexDirection="column"
                alignItems="start"
                justifyContent="start"
                width="65%"
                height="50px"
                borderBottom="solid 1px #cecece"
              >
                <Typography color="#cecece">Frequência</Typography>
                <Typography fontWeight="bold" fontSize="21px">
                  67%
                </Typography>
              </Box>

              <Box
                mt="20px"
                display="flex"
                flexDirection="column"
                alignItems="start"
                justifyContent="start"
                width="65%"
                height="50px"
                borderBottom="solid 1px #cecece"
              >
                <Typography color="#cecece">
                  Progresso na faixa atual
                </Typography>
                <Typography fontWeight="bold" fontSize="21px">
                  81%
                </Typography>
              </Box>
            </Box>
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
            {student === null ? (
              <LineLoading>
                <Spinner />
              </LineLoading>
            ) : (
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
                    <Image
                      src="/assets/images/faixas/preta/preta_ponta_tres.png"
                      height="20px"
                    />
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
                  </Line>
                </ContentBottom>
              </>
            )}
          </Box>
          {/* CONTENT */}
        </Box>
      </Box>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = onlyAuth(async () => {
  return {
    props: {},
  };
});

Perfil.layout = AppLayout;

export default Perfil;
