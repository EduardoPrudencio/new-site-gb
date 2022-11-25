import Link from "next/link";

import React, { useState, useEffect } from "react";

import HeaderText from "@component/headerText";
import AppLayout from "@component/layout/AppLayout";
import Spinner from "@component/Spinner";
import { onlyAuth } from "@utils/onlyAuth";
import moment from "moment";
import { GetServerSideProps } from "next";
import { GetAll } from "services/api/student";
import styled from "styled-components";
import { User } from "types";

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

const Line = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 20px 10px;
  background-color: #ffffff;
  border-radius: 5px;
  margin-bottom: 5px;
  border: solid 1px #cecece;
  color: #959493;

  &:hover {
    border: solid 1px #e33f06;
    background-color: #f2e9e9;
  }
`;

const LineContent = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: start;
`;

const LineLoading = styled.div`
  margin-top: 30px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

function Users() {
  const [students, setStudents] = useState<User[]>();
  useEffect(() => {
    const GetAllStudents = async () => {
      const list = await GetAll();
      setStudents(list.data.data);
    };
    GetAllStudents();
  }, []);

  return (
    <Body>
      <Container>
        <Header>
          <LineContent>
            <HeaderText maxWidth={150} text="Nome" color="#ffffff" bold />
            <HeaderText maxWidth={150} text="Sobrenome" color="#ffffff" bold />
            <HeaderText maxWidth={150} text="Telefone" color="#ffffff" bold />
            <HeaderText maxWidth={150} text="Nascimento" color="#ffffff" bold />
            <HeaderText maxWidth={150} text="Estatus" color="#ffffff" bold />
            <HeaderText
              maxWidth={200}
              text="Data de cadastro"
              color="#ffffff"
              bold
            />
          </LineContent>
        </Header>

        {typeof students === "undefined" && (
          <LineLoading>
            <Spinner />
          </LineLoading>
        )}

        {students?.map((student) => {
          return (
            <Link href={`/account/${student.id}`}>
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
        })}
      </Container>
    </Body>
  );
}

export const getServerSideProps: GetServerSideProps = onlyAuth(async () => {
  return {
    props: {},
  };
});

Users.layout = AppLayout;

export default Users;
