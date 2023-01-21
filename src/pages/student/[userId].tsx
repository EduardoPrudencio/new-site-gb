import { useRouter } from "next/router";

import { useEffect, useState } from "react";

import Box from "@component/Box";
import AppLayout from "@component/layout/AppLayout";
import Spinner from "@component/Spinner";
import StudentData from "@component/StudentData";
import Typography from "@component/Typography";
import { onlyAuth } from "@utils/onlyAuth";
import { GetServerSideProps } from "next";
import styled from "styled-components";
import { User } from "types";

import { GetById } from "@services/api/student";

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
  const [student, setStudent] = useState<User>(null);

  useEffect(() => {
    const GetSutentById = async () => {
      const user = await GetById(userId);
      setStudent(user);
    };
    GetSutentById();
  }, []);

  return (
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
                {student?.frequencyPercentage}%
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
              <Typography color="#cecece">Progresso na faixa atual</Typography>
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
              <StudentData student={student} readonly={false} />
              {/* <Line>
                  <Button
                    height="10px"
                    variant="contained"
                    bg={theme.colors.primary.main}
                    color="primary"
                    maxHeight="25px"
                    onClick={() => AddNivel()}
                  >
                    Salvar
                  </Button>
                </Line> */}
            </>
          )}
        </Box>
        {/* CONTENT */}
      </Box>
    </Box>
  );
}

export const getServerSideProps: GetServerSideProps = onlyAuth(async () => {
  return {
    props: {},
  };
});

Perfil.layout = AppLayout;

export default Perfil;
