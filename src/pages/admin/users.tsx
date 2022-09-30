import React, {useState} from "react";
import AppLayout from "@component/layout/AppLayout";
import { GetAll } from "services/api/student"
import { useEffect } from "react";
import { User } from "types";
import { BsFillPencilFill } from "react-icons/bs";
import Link from "next/link";

import styled from "styled-components";
import HeaderText from "@component/headerText";
import moment from "moment";
const Container = styled.div`
  padding: 50px;
  min-height: 250px;
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
      border: solid 1px #E33F06;
    }
  `;

  const LineContent = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: start;
  `;

function Users(){
    const [students, setStudents] = useState<User[]>();

    useEffect( () => {
      const GetAllStudents = async () => {
        const list = await GetAll();
        setStudents(list.data.data);
      };
      GetAllStudents();
    }, []);

    return ( 
      <>
        <Container>
        <Header>
        <LineContent>
           <HeaderText maxWidth={200} text="Nome" color="#ffffff" bold={true} />
           <HeaderText maxWidth={200} text="Sobrenome" color="#ffffff" bold={true} />
           <HeaderText maxWidth={200} text="Telefone" color="#ffffff" bold={true} />
           <HeaderText maxWidth={200} text="Nascimento" color="#ffffff" bold={true} />
           <HeaderText maxWidth={200} text="Estatus" color="#ffffff" bold={true} />
         </LineContent>
        </Header>
          {
            students?.map((student) => {
              return(
                <Link href={student.id}>
                  <Line>
                    <LineContent>
                      <HeaderText maxWidth={200} text={student.name} bold={true} />
                      <HeaderText maxWidth={200} text={student.lastName} />
                      <HeaderText maxWidth={200} text={student.phoneNumber} />
                      <HeaderText maxWidth={200} text={moment(student.birthDate).format("DD/MM/YYYY")} />
                      <HeaderText maxWidth={200} text="Ativo" />
                    </LineContent>
                    <BsFillPencilFill />
                  </Line>
                </Link>
              );
            })}
        </Container>
      </>
    )
}

Users.layout = AppLayout;

export default Users;