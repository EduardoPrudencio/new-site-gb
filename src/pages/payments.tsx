import React from "react";

import HeaderText from "@component/headerText";
import AppLayout from "@component/layout/AppLayout";
import { onlyGuest } from "@utils/onlyGuest";
import { GetServerSideProps } from "next";
import styled from "styled-components";

const Body = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const Container = styled.div`
  padding: 50px;
  height: 600px;
  overflow-y: auto;
  min-height: 250px;
  margin-bottom: 100px;
`;

const Header = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 15px 10px;
  background-color: #494949;
  border-radius: 5px;
  margin-bottom: 5px;
  border: solid 1px #cecece;
  color: #ffffff;
  font-weight: bold;
`;
// const Line = styled.div`
//   display: flex;
//   flex-direction: row;
//   justify-content: space-between;
//   padding: 20px 10px;
//   background-color: #ffffff;
//   border-radius: 5px;
//   margin-bottom: 5px;
//   border: solid 1px #cecece;
//   color: #959493;

//   &:hover {
//     border: solid 1px #e33f06;
//     background-color: #f2e9e9;
//   }
// `;

const LineContent = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: start;
`;

// const LineLoading = styled.div`
//   margin-top: 30px;
//   display: flex;
//   flex-direction: row;
//   align-items: center;
//   justify-content: center;
// `;

const Payments: React.FC = () => {
  return (
    <Body>
      <Container>
        <Header>
          <LineContent>
            <HeaderText maxWidth={150} text="Data" color="#ffffff" bold />
            <HeaderText
              maxWidth={150}
              text="Data de referência"
              color="#ffffff"
              bold
            />
            <HeaderText maxWidth={150} text="Aluno" color="#ffffff" bold />
            <HeaderText maxWidth={150} text="Atividade" color="#ffffff" bold />
            <HeaderText maxWidth={150} text="Valor" color="#ffffff" bold />
          </LineContent>
        </Header>

        {/* {typeof students === "undefined" && (
          <LineLoading>
            <Spinner />
          </LineLoading>
        )}

        {students?.map((student) => {
          return (
            <Link href={`/student/${student.id}`}>
              <Line>
                <LineContent>
                  <HeaderText maxWidth={150} text={student.name} bold />
                  <HeaderText maxWidth={150} text={student.lastName} />
                  <HeaderText maxWidth={150} text={student.phoneNumber} />
                  <HeaderText
                    maxWidth={150}
                    text={moment(student.birthDate).format("DD/MM/YYYY")}
                  />
                  <HeaderText maxWidth={150} text="Ativo" />
                  <HeaderText
                    maxWidth={200}
                    text={moment(student.registrationDate).format("DD/MM/YYYY")}
                  />
                </LineContent>
              </Line>
            </Link>
          );
        })} */}
      </Container>
    </Body>
  );
};

export const getServerSideProps: GetServerSideProps = onlyGuest(async () => {
  return {
    props: {},
  };
});

Payments.layout = AppLayout;

export default Payments;
