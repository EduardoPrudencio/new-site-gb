/* eslint-disable no-return-assign */
/* eslint-disable no-param-reassign */
import { useRouter } from "next/router";

import React, { useState } from "react";
import Modal from "react-modal";

import Box from "@component/Box";
import Button from "@component/buttons/Button";
import IconButton from "@component/buttons/IconButton";
import Icon from "@component/icon/Icon";
import AppLayout from "@component/layout/AppLayout";
import { StyledSessionCard } from "@component/sessions/SessionStyle";
import Spinner from "@component/Spinner";
import TextField from "@component/text-field/TextField";
import { onlyAuth } from "@utils/onlyAuth";
import { theme } from "@utils/theme";
import { useFormik } from "formik";
import { GetServerSideProps } from "next";
import { Add } from "services/api/student";
import styled from "styled-components";
import * as yup from "yup";

import { GetAddressByCpf } from "@services/api/Address";

import Alert from "../../components/alert";

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

const FormContent = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-around;
  margin-top: 20px;
`;

const ColumnContentLefth = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-right: 10px;
  width: 100%;
`;

const ColumnContentRight = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  width: 100%;
`;

const HorizontalLine = styled.hr`
  color: #cecece;
  margin-top: 30px;
  margin-bottom: 30px;
`;

const Label = styled.label`
  font-size: 18px;
  font-weight: bold;
`;

const SmallLabel = styled.label`
  font-size: 13px;
  color: #c3c3c3;
`;

const initialValues = {
  name: "",
  lastname: "",
  username: "",
  email: "",
  password: "",
  phonenumber: "",
  birthdate: "",

  cep: "",
  address: "",
  complemento: "",
  bairro: "",
  number: "",
  cidade: "",
  uf: "",
};

const formSchema = yup.object().shape({
  name: yup.string().required("O campo nome é obrigatório"),
  lastname: yup.string().required("O campo sobrenome é obrigatório"),
  username: yup.string().required("O campo username é obrigatório"),
  email: yup
    .string()
    .email("email inválido")
    .required("o campo email é obrigatório"),
  password: yup.string().required("O campo password é obrigatório"),
  phonenumber: yup.string().required("O campo phone number é obrigatório"),
  birthdate: yup.string().required("O campo birthdate é obrigatório"),

  cep: yup.string().required("Um cep deve ser informado"),
  address: yup.string().required("Um endereço deve ser informado"),
  complemento: yup.string().required("Um complemento deve ser informado"),
  bairro: yup.string().required("Um bairro deve ser informado"),
  number: yup.string().required("Um número deve ser informado"),
  cidade: yup.string().required("Uma cidade deve ser informado"),
  uf: yup.string().required("O campo uf é obrigatório"),
});

function AddUser() {
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [message, setMessage] = useState("");
  const router = useRouter();
  const [showMessage, setShowMessage] = useState(false);
  const [cepValue, setCepValue] = useState("");
  const [phoneValue, setPhoneValue] = useState("");
  const [addressValue, setAddressValue] = useState("");
  const [cityValue, setCityValue] = useState("");
  const [districtValue, setDistrictValue] = useState("");
  const [statetValue, setStateValue] = useState("");
  const [lastCont, setLastCont] = useState(0);
  const [lastPhoneCont, setLastPhoneCont] = useState(0);
  const [cepMessageSearch, setCepMessageSearch] = useState(
    "Verificando endereço com o cep informado"
  );

  const togglePasswordVisibility = () => {
    setPasswordVisibility((visible) => !visible);
  };

  const handleFormSubmit = async (value) => {
    setLoading(true);
    const response = await Add(value);
    setLoading(false);
    setHasError(false);

    if (response.status === 201) {
      setMessage("Dados salvos com sucesso!");
      router.reload();
    } else if (response.status === 400 || response.status === 404) {
      setMessage(response.data.data[0]);
    } else if (response.status === 409) {
      setMessage(
        "Os dados informados não puderam ser salvos.\n Verifique e tente novamente."
      );
      setHasError(true);
    }
    setShowModal(true);
  };

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      onSubmit: handleFormSubmit,
      initialValues,
      validationSchema: formSchema,
    });

  const GetAddressByCep = async (cep: string) => {
    cep = cep.replace(/[a-zA-Z]/, "");

    if (cep.length === 9) {
      setShowMessage(true);
      document.getElementById("cep").disabled = true;

      const response = await GetAddressByCpf(cep);

      setAddressValue(response.data.address);
      setCityValue(response.data.city);
      setDistrictValue(response.data.district);
      setStateValue(response.data.state);

      setAddressValue("");
      setCityValue("");
      setDistrictValue("");
      setStateValue("");

      if (response.status === 200) {
        setCepMessageSearch("Endereço encontrado.");
        document.getElementById("cep").disabled = false;
      } else {
        setCepMessageSearch(
          "Nenhum endereço foi encontrado com o cep informado."
        );
        document.getElementById("cep").disabled = false;
      }
    } else {
      setShowMessage(false);
      setAddressValue("");
    }

    if (cep.length === 10 && lastCont < cep.length) return;

    if (cep.length === 5 && lastCont < cep.length && !cep.includes("-")) {
      const cepFomated = `${cep}-`;
      setCepValue(cepFomated);
    } else if (
      cep.length === 6 &&
      lastCont < cep.length &&
      !cep.includes("-")
    ) {
      const cepFomated = `${cep.substring(0, cep.length - 1)}-${
        cep[cep.length - 1]
      }`;
      setCepValue(cepFomated);
    } else setCepValue(cep);

    setLastCont(cep.length);
  };

  const PhoneFormat = (phone: string) => {
    phone = phone.replace(/[a-zA-Z]/, "");

    if (phone.length === 15 && lastPhoneCont < phone.length) return;

    if (phone.length === 1 && phone[0] !== "(" && lastPhoneCont < phone.length)
      setPhoneValue(`(${phone}`);
    else if (
      phone.length === 3 &&
      phone[3] !== ")" &&
      lastPhoneCont < phone.length
    )
      setPhoneValue(`${phone})`);
    else if (
      phone.length === 4 &&
      phone[3] !== ")" &&
      lastPhoneCont < phone.length
    )
      setPhoneValue(`(${phone[1]}${phone[2]})${phone[phone.length - 1]}`);
    else if (
      phone.length === 9 &&
      phone[8] !== "-" &&
      lastPhoneCont < phone.length
    )
      setPhoneValue(`${phone}-`);
    else if (
      phone.length === 10 &&
      phone[8] !== "-" &&
      lastPhoneCont < phone.length
    )
      setPhoneValue(
        `${phone.substring(0, phone.length - 1)}-${phone[phone.length - 1]}`
      );
    else setPhoneValue(phone);

    setLastPhoneCont(phone.length);
  };

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
      >
        <Box
          display="flex"
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between"
          width="1200px;"
        >
          <StyledSessionCard mx="auto" my="2rem" boxShadow="large" width={800}>
            <form className="content" onSubmit={handleSubmit}>
              <Label>Dados pessoais</Label>
              <FormContent>
                <ColumnContentLefth>
                  <TextField
                    mb="0.5rem"
                    name="name"
                    label="Nome"
                    data-cy="nickname"
                    placeholder="Nome"
                    fullwidth
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.name || ""}
                    errorText={touched.name && errors.name}
                  />
                  <TextField
                    mb="0.5rem"
                    name="email"
                    placeholder="exemplo@mail.com"
                    label="Email"
                    data-cy="email"
                    type="email"
                    fullwidth
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.email || ""}
                    errorText={touched.email && errors.email}
                  />
                  <TextField
                    mb="0.75rem"
                    name="password"
                    data-cy="password"
                    placeholder="*********"
                    type={passwordVisibility ? "text" : "password"}
                    label="Password"
                    fullwidth
                    endAdornment={
                      <IconButton
                        size="small"
                        type="button"
                        p="0.25rem"
                        mr="0.25rem"
                        color={passwordVisibility ? "gray.700" : "gray.600"}
                        onClick={togglePasswordVisibility}
                      >
                        <Icon variant="small" defaultcolor="currentColor">
                          {passwordVisibility ? "eye-alt" : "eye"}
                        </Icon>
                      </IconButton>
                    }
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.password || ""}
                    errorText={touched.password && errors.password}
                  />
                </ColumnContentLefth>
                <ColumnContentRight>
                  <TextField
                    mb="0.5rem"
                    name="lastname"
                    label="Sobrenome"
                    placeholder="Sobrenome"
                    fullwidth
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.lastname || ""}
                    errorText={touched.lastname && errors.lastname}
                  />
                  <TextField
                    mb="0.5rem"
                    name="username"
                    label="Nome de usuário"
                    placeholder="Nome de usuário"
                    fullwidth
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.username || ""}
                    errorText={touched.username && errors.username}
                  />
                  <TextField
                    mb="0.5rem"
                    name="phonenumber"
                    label="Celular"
                    placeholder="(xx)xxxxx-xxxx"
                    fullwidth
                    type="tel"
                    onBlur={handleBlur}
                    onChange={(e) => {
                      handleChange(e);
                      PhoneFormat(e.target.value);
                    }}
                    value={phoneValue}
                    errorText={touched.phonenumber && errors.phonenumber}
                  />
                  <TextField
                    mb="0.5rem"
                    name="birthdate"
                    label="Data de nascimento"
                    placeholder="99/99/9999"
                    fullwidth
                    type="date"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.birthdate || ""}
                    errorText={touched.birthdate && errors.birthdate}
                  />
                </ColumnContentRight>
              </FormContent>
              <HorizontalLine />
              <Label>Endereço</Label>
              {showMessage && <SmallLabel> {cepMessageSearch}</SmallLabel>}
              <FormContent>
                <ColumnContentLefth>
                  <TextField
                    mb="0.5rem"
                    name="cep"
                    id="cep"
                    label="Cep"
                    placeholder="xxxxx-xxx"
                    fullwidth
                    onBlur={handleBlur}
                    onChange={(e) => {
                      handleChange(e);
                      GetAddressByCep(e.target.value);
                    }}
                    value={cepValue}
                    errorText={touched.cep && errors.cep}
                  />
                  <TextField
                    mb="0.5rem"
                    name="address"
                    label="Endereço"
                    placeholder="rua, av."
                    fullwidth
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={
                      addressValue !== ""
                        ? (values.address = addressValue)
                        : values.address
                    }
                    errorText={touched.address && errors.address}
                  />
                  <TextField
                    mb="0.5rem"
                    name="complemento"
                    label="Complemento"
                    placeholder="apto. 999"
                    fullwidth
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.complemento || ""}
                    errorText={touched.complemento && errors.complemento}
                  />
                  <TextField
                    mb="0.5rem"
                    name="bairro"
                    label="Bairro"
                    placeholder="Bairro"
                    fullwidth
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={
                      districtValue !== ""
                        ? (values.bairro = districtValue)
                        : values.bairro
                    }
                    errorText={touched.bairro && errors.bairro}
                  />
                </ColumnContentLefth>
                <ColumnContentRight>
                  <TextField
                    mb="0.5rem"
                    name="number"
                    label="Número"
                    placeholder="99"
                    fullwidth
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.number || ""}
                    errorText={touched.number && errors.number}
                  />
                  <TextField
                    mb="0.5rem"
                    name="cidade"
                    id="cidade"
                    label="Cidade"
                    placeholder="Cidade"
                    fullwidth
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={
                      cityValue !== ""
                        ? (values.cidade = cityValue)
                        : values.cidade
                    }
                    errorText={touched.cidade && errors.cidade}
                  />
                  <TextField
                    mb="0.5rem"
                    name="uf"
                    label="Uf"
                    placeholder="Uf"
                    fullwidth
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={
                      statetValue !== "" ? (values.uf = statetValue) : values.uf
                    }
                    errorText={touched.uf && errors.uf}
                  />
                </ColumnContentRight>
              </FormContent>
              <Button
                mb="1.25rem"
                mt="50px"
                variant="contained"
                color="primary"
                data-cy="cadastrar"
                backgroundColor={theme.colors.primary.main}
                type="submit"
                fullwidth
              >
                {!loading ? "Criar Conta" : <Spinner />}
              </Button>
            </form>
          </StyledSessionCard>
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

AddUser.layout = AppLayout;
export default AddUser;
