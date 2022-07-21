import React, { useState } from "react";
import Box from "@component/Box";
import IconButton from "@component/buttons/IconButton";
import Icon from "@component/icon/Icon";
import AppLayout from "@component/layout/AppLayout";
import Navbar from "@component/navbar/Navbar";
import { StyledSessionCard } from "@component/sessions/SessionStyle";
import TextField from "@component/text-field/TextField";
import styled from "styled-components";
import { onlyAuth } from "@utils/onlyAuth";
import { useFormik } from "formik";
import { GetServerSideProps } from "next";
import * as yup from "yup";
import Button from "@component/buttons/Button";
import { theme } from "@utils/theme";

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
  name: "",
  email: "",
  password: "",
  voucher: "",
  receiveAboutProductsAndServices: false,
  agreementTerms: false,
};

const formSchema = yup.object().shape({
  name: yup.string().required("nome é obrigatório"),
  email: yup.string().email("email inválido").required("é obrigatório"),
  password: yup.string().required("é obrigatório"),
  agreementTerms: yup
    .boolean()
    .required()
    .oneOf([true], "você deve concordar com os termos e condições."),
});

function AddUser() {
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const [temp, setTemp] = useState(null);
  const togglePasswordVisibility = () => {
    setPasswordVisibility((visible) => !visible);
  };

  const handleFormSubmit = async (values) => {
    setTemp(values);
  };

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      onSubmit: handleFormSubmit,
      initialValues,
      validationSchema: formSchema,
    });

  return (
    <>
      {temp && <Label>Teste</Label>}
      <Navbar />
      <Box
        display="flex"
        flexDirection="row"
        alignItems="center"
        justifyContent="center"
        marginTop="20px"
      >
        <Box
          display="flex"
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between"
          bg="#FFFFFF"
          width="1200px;"
        >
          <StyledSessionCard mx="auto" my="2rem" boxShadow="large" width="100%">
            <form className="content" onSubmit={handleSubmit}>
              <Label>Dados pessoais</Label>
              <FormContent>
                <ColumnContentLefth>
                  <TextField
                    mb="0.5rem"
                    name="name"
                    label="Nome"
                    data-cy="nickname"
                    placeholder="Seu nome"
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
                    placeholder="Seu sobrenome"
                    fullwidth
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.name || ""}
                    errorText={touched.name && errors.name}
                  />
                  <TextField
                    mb="0.5rem"
                    name="username"
                    label="Nome de usuário"
                    placeholder="Nome de usuário"
                    fullwidth
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.name || ""}
                    errorText={touched.name && errors.name}
                  />
                  <TextField
                    mb="0.5rem"
                    name="fonenumber"
                    label="phone"
                    placeholder="(xx)xxxxx-xxxx"
                    fullwidth
                    type="number"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.name || ""}
                    errorText={touched.name && errors.name}
                  />
                  <TextField
                    mb="0.5rem"
                    name="birthdate"
                    label="Data de nascimento"
                    placeholder="xx/xx/xxxx"
                    fullwidth
                    type="date"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.name || ""}
                    errorText={touched.name && errors.name}
                  />
                </ColumnContentRight>
              </FormContent>
              <HorizontalLine />
              <Label>Endereço</Label>
              <FormContent>
                <ColumnContentLefth>
                  <TextField
                    mb="0.5rem"
                    name="cep"
                    label="Cep"
                    placeholder="xxxxx-xxx"
                    fullwidth
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.name || ""}
                    errorText={touched.name && errors.name}
                  />
                  <TextField
                    mb="0.5rem"
                    name="address"
                    label="Endereço"
                    placeholder="rua, av., vale"
                    fullwidth
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.name || ""}
                    errorText={touched.name && errors.name}
                  />
                  <TextField
                    mb="0.5rem"
                    name="comlemento"
                    label="Complemento"
                    placeholder="apto. 999"
                    fullwidth
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.name || ""}
                    errorText={touched.name && errors.name}
                  />
                  <TextField
                    mb="0.5rem"
                    name="bairro"
                    label="Bairro"
                    placeholder="Madureira"
                    fullwidth
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.name || ""}
                    errorText={touched.name && errors.name}
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
                    value={values.name || ""}
                    errorText={touched.name && errors.name}
                  />
                  <TextField
                    mb="0.5rem"
                    name="cidade"
                    label="Cidade"
                    placeholder="Rio de Janeiro"
                    fullwidth
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.name || ""}
                    errorText={touched.name && errors.name}
                  />
                  <TextField
                    mb="0.5rem"
                    name="uf"
                    label="Uf"
                    placeholder="Rio de Janeiro"
                    fullwidth
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.name || ""}
                    errorText={touched.name && errors.name}
                  />
                </ColumnContentRight>
              </FormContent>
              <Button
                mb="1.25rem"
                variant="contained"
                color="primary"
                data-cy="cadastrar"
                backgroundColor={theme.colors.primary.main}
                type="submit"
                fullwidth
              >
                Criar Conta
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
