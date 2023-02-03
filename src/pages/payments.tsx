/* eslint-disable no-new-wrappers */
import Link from "next/link";

import React, { useEffect, useState } from "react";

import HeaderText from "@component/headerText";
import AppLayout from "@component/layout/AppLayout";
import Spinner from "@component/Spinner";
import { onlyGuest } from "@utils/onlyGuest";
import moment from "moment";
import { GetServerSideProps } from "next";
import styled from "styled-components";
import { Payment } from "types";

import { GetAll } from "@services/api/payment";

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
  margin: 0 0 5px 10px;
  color: #959493;
  font-size: 15px;
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

const Payments: React.FC = () => {
  const [payments, setPayments] = useState<Payment[]>();
  const [costs, setCost] = useState<number[]>();

  useEffect(() => {
    const GetAllPayments = async () => {
      const list = await GetAll();
      const allCost = list.data.data.map((p) => p.activity.cost);
      const sum = allCost.reduce((a, b) => a + b, 0);
      setCost(sum);
      setPayments(list.data.data);
    };
    GetAllPayments();
  }, []);

  return (
    <Body>
      <Container>
        <h3>Total: {`R$ ${new Number(costs).toFixed(2)}`}</h3>
        <Header>
          <LineContent>
            <HeaderText maxWidth={130} text="Data" color="#ffffff" bold />
            <HeaderText
              maxWidth={190}
              text="Data de referência"
              color="#ffffff"
              bold
            />
            <HeaderText maxWidth={170} text="Aluno" color="#ffffff" bold />
            <HeaderText maxWidth={150} text="Atividade" color="#ffffff" bold />
            <HeaderText maxWidth={140} text="Valor" color="#ffffff" bold />
          </LineContent>
        </Header>

        {typeof payments === "undefined" && (
          <LineLoading>
            <Spinner />
          </LineLoading>
        )}

        {payments?.map((payment) => {
          return (
            <Line>
              <LineContent>
                <HeaderText
                  maxWidth={150}
                  text={moment(payment.date).format("DD/MM/YYYY")}
                />
                <HeaderText
                  maxWidth={150}
                  text={moment(payment.referenceDate).format("DD/MM/YYYY")}
                />

                <HeaderText maxWidth={200}>
                  <Link href={`/student/${payment.studentId}`}>
                    {payment.studentName}
                  </Link>
                </HeaderText>

                <HeaderText maxWidth={130} text={payment.activity.name} />
                <HeaderText
                  maxWidth={150}
                  color="#52be80"
                  text={`R$ ${new Number(payment.activity.cost).toFixed(2)}`}
                />
              </LineContent>
            </Line>
            // </Link>
          );
        })}
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
