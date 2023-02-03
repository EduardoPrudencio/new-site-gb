import { useRouter } from "next/router";

import { useEffect, useState } from "react";
import Modal from "react-modal";

import Box from "@component/Box";
import AppLayout from "@component/layout/AppLayout";
import Spinner from "@component/Spinner";
import StudentData from "@component/StudentData";
import StudentDataMobile from "@component/StudentDataMobile";
import Typography from "@component/Typography";
import useWindowSize from "@hook/useWindowSize";
import { onlyAuth } from "@utils/onlyAuth";
import { theme } from "@utils/theme";
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

function Perfil() {
  const { query } = useRouter();
  const { userId } = query;
  const router = useRouter();
  const [student, setStudent] = useState<User>(null);
  const [hasError, setHasError] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState("");

  const [width] = useWindowSize();

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
          smallDevice={width < 570}
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
          {width > 570 && (
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
                    {student?.frequencyPercentage}%
                  </Typography>
                </Box>

                {/* <Box
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
                </Box> */}
              </Box>
            </Box>
          )}
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
                {width > 570 ? (
                  <StudentData student={student} />
                ) : (
                  <StudentDataMobile student={student} />
                )}

                <Line>
                  <Button
                    height="0px"
                    variant="contained"
                    marginLeft="10px"
                    bg={theme.colors.primary.main}
                    color="primary"
                    maxHeight="25px"
                    onClick={() => GoToEdit(student?.id)}
                  >
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
                    Solicitar Presença
                  </Button>
                </Line>
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
