/* eslint no-param-reassign: "error" */
/* eslint no-return-assign: "error" */
import { useRouter } from "next/router";

import React, { useContext, useEffect, useState } from "react";
import Modal from "react-modal";

import Box from "@component/Box";
import Button from "@component/buttons/Button";
import AppLayout from "@component/layout/AppLayout";
import { StyledSessionCard } from "@component/sessions/SessionStyle";
import Spinner from "@component/Spinner";
import TextField from "@component/text-field/TextField";
import { onlyAuth } from "@utils/onlyAuth";
import { theme } from "@utils/theme";
import { useFormik } from "formik";
import moment from "moment";
import { GetServerSideProps } from "next";
import { Update, GetById } from "services/api/student";
import styled from "styled-components";
import { User } from "types";
import * as yup from "yup";

import { AuthCotext } from "@context/AuthContext";

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

const initialValues = {
  id: "",
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
  const { user } = useContext(AuthCotext);

  const { query } = useRouter();
  const { userId } = query;
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [message, setMessage] = useState();
  const [student, setStudent] = useState<User>(null);
  const router = useRouter();

  useEffect(() => {
    const GetSutentById = async () => {
      const userLoaded = await GetById(user?.id || userId);
      setStudent(userLoaded);
    };
    GetSutentById();
  }, []);

  const handleFormSubmit = async (values) => {
    // const ResetForm = () => {
    //   values.id = "";
    //   values.name = "";
    //   values.email = "";
    //   values.password = "";
    //   values.lastname = "";
    //   values.username = "";
    //   values.birthdate = "";
    //   values.phonenumber = "";
    //   values.address = "";
    //   values.bairro = "";
    //   values.complemento = "";
    //   values.number = "";
    //   values.cep = "";
    //   values.cidade = "";
    //   values.uf = "";
    // };

    values.id = student.id;

    setLoading(true);
    const response = await Update(values);
    setLoading(false);
    setHasError(false);

    if (
      response.status === 0 ||
      response.status === 200 ||
      response.status === 201 ||
      response.status === 204
    ) {
      setMessage("Dados alterados com sucesso!");
      router.reload();
    } else if (response.status === 400 || response.status === 404) {
      setMessage(response.data.data[0]);
    } else if (response.status === 401 || response.status === 409) {
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
                    value={values.name || (values.name = student?.name)}
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
                    value={values.email || (values.email = student?.email)}
                    errorText={touched.email && errors.email}
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
                    value={
                      values.birthDate ||
                      (values.birthdate = moment(student?.birthDate).format(
                        "YYYY-MM-DD"
                      ))
                    }
                    errorText={touched.birthdate && errors.birthdate}
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
                    value={
                      values.lastname || (values.lastname = student?.lastName)
                    }
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
                    value={
                      values.username || (values.username = student?.userName)
                    }
                    errorText={touched.username && errors.username}
                  />
                  <TextField
                    mb="0.5rem"
                    name="phonenumber"
                    label="phone"
                    placeholder="(xx)xxxxx-xxxx"
                    fullwidth
                    type="tel"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={
                      values.phonenumber ||
                      (values.phonenumber = student?.phoneNumber)
                    }
                    errorText={touched.phonenumber && errors.phonenumber}
                  />
                </ColumnContentRight>
              </FormContent>
              <HorizontalLine />
              <Label>Endereço</Label>
              <FormContent>
                <ColumnContentLefth>
                  <TextField
                    mb="0.5rem"
                    name="address"
                    label="Endereço"
                    placeholder="rua, av."
                    fullwidth
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={
                      values.address ||
                      (values.address = student?.address?.endereco)
                    }
                    errorText={touched.address && errors.address}
                  />
                  <TextField
                    mb="0.5rem"
                    name="cep"
                    label="Cep"
                    placeholder="xxxxx-xxx"
                    fullwidth
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.cep || (values.cep = student?.address?.cep)}
                    errorText={touched.cep && errors.cep}
                  />
                  <TextField
                    mb="0.5rem"
                    name="complemento"
                    label="Complemento"
                    placeholder="apto. 999"
                    fullwidth
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={
                      values.complemento ||
                      (values.complemento = student?.address?.complemento)
                    }
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
                      values.bairro ||
                      (values.bairro = student?.address?.bairro)
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
                    value={
                      values.number ||
                      (values.number = student?.address?.numero)
                    }
                    errorText={touched.number && errors.number}
                  />
                  <TextField
                    mb="0.5rem"
                    name="cidade"
                    label="Cidade"
                    placeholder="Cidade"
                    fullwidth
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={
                      values.cidade ||
                      (values.cidade = student?.address?.cidade)
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
                    value={values.uf || (values.uf = student?.address?.uf)}
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
                {!loading ? "Salvar Alterações" : <Spinner />}
              </Button>
            </form>
          </StyledSessionCard>
        </Box>
      </Box>
    </>
  );
}

AddUser.layout = AppLayout;

export const getServerSideProps: GetServerSideProps = onlyAuth(async () => {
  return {
    props: {},
  };
});

export default AddUser;
