import React, { useEffect } from "react";
import { toast } from "react-toastify";

import styled from "styled-components";

import { GetInfo } from "@services/api/Activity";
import { AddPayment } from "@services/api/payment";

const Form = styled.form`
  margin-top: 10px;
`;

const Input = styled.input`
  height: 35px;
  border-radius: 5px;
  margin-right: 5px;
  font-size: 15px;
  border: solid 1px #cecece;
  :focus {
    border: solid 1px #ff0000;
  }
  :hover {
    border: solid 1px #ff0000;
  }
`;

const InputSubmit = styled(Input)`
  color: #ffffff;
  background-color: #d82803;
  margin-top: 10px;
  width: 98%;
  opacity: 0.9;
  border: none;

  :hover {
    opacity: 1;
  }
`;

const Body = styled.div`
  width: 340px;
`;

const Top = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border-bottom: solid 1px #cecece;
`;

interface IProps {
  UserId: string;
  StillProcess: (value: boolean) => void;
}

const PaymentForm: React.FC<IProps> = ({ UserId, StillProcess }) => {
  const RegisterPayment = async () => {
    const paymentValue = (
      document.getElementById("ipValue") as HTMLInputElement
    ).value;
    const paymentDate = (document.getElementById("ipDate") as HTMLInputElement)
      .value;

    const result = await AddPayment(UserId, paymentValue, paymentDate);

    if (result.status === 200)
      toast.success("Registro de pagamento realizado com sucesso!");
    else toast.error("O correu algum erro no registro de pagamento.");

    return StillProcess(false);
  };

  useEffect(() => {
    const date = new Date();
    const currentDate = date.toISOString().substring(0, 10);

    (document.getElementById("ipDate") as HTMLInputElement).value = currentDate;
    const form = document.getElementById("form_main");
    form.addEventListener("submit", (e) => {
      e.preventDefault();
    });

    GetInfo().then((response) => {
      (document.getElementById("ipValue") as HTMLInputElement).value =
        response.data.cost;
    });
  }, []);

  return (
    <Body>
      <Top>
        <h3>Registrar Pagamento</h3>
      </Top>
      <Form id="form_main">
        <Input id="ipDate" type="date" />
        <Input id="ipValue" type="number" />
        <InputSubmit
          onClick={() => RegisterPayment()}
          type="submit"
          value="Registrar Pagamento"
        />
      </Form>
    </Body>
  );
};

export default PaymentForm;
