import React, { useState } from "react";
import Box from "@component/Box";
import IconButton from "@component/buttons/IconButton";
import Icon from "@component/icon/Icon";
import AppLayout from "@component/layout/AppLayout";
import Navbar from "@component/navbar/Navbar";
import { StyledSessionCard } from "@component/sessions/SessionStyle";
import TextField from "@component/text-field/TextField";
import styled from "styled-components";
import { useFormik } from "formik";
import { GetServerSideProps } from "next";
import * as yup from "yup";
import Button from "@component/buttons/Button";
import { theme } from "@utils/theme";
import { onlyAdmin } from "@utils/onlyAdmin";
import { Add } from "services/api/student"
import Spinner from "@component/Spinner";
import Alert from "../../components/alert"
import Modal from "react-modal"; 

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
}

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
  lastname: "",
  username: "",
  email: "",
  password: "",
  fonenumber: "",
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
  email: yup.string().email("email inválido").required("o campo email é obrigatório"),
  password: yup.string().required("O campo password é obrigatório"),
  fonenumber: yup.string().required("O campo phone number é obrigatório"),
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

  const togglePasswordVisibility = () => {
    setPasswordVisibility((visible) => !visible);
  };

  const ResetForm = () => {
    values.name = "";
    values.email = "";
    values.password = "";
    values.lastname = "";
    values.username = "";
    values.birthdate = "";
    values.fonenumber = "";

    values.address = "";
    values.bairro = "";
    values.complemento = "";
    values.number = "";
    values.cep = "";
    values.cidade = "";
    values.uf = "";
  };

  const handleFormSubmit = async (values) => {
    setLoading(true);
    const response = await Add(values);
    setLoading(false);

    if(response.status === 201) {
      setMessage("Dados salvos com sucesso!");
      ResetForm();
    } else if(response.status === 400 || response.status === 404 ) {
      setHasError(true);
      setMessage(response.data.data[0]);  
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
      <Navbar />
      <Modal
        isOpen={showModal}
        style={modalStyles}
      >
        {/* <Spinner color="#FF0000"/> */}

        <Alert Exec={setShowModal} ValueToExec={false} Error={hasError} Message={message}/>
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
                    value={values.lastname   || ""}
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
                    name="fonenumber"
                    label="phone"
                    placeholder="(xx)xxxxx-xxxx"
                    fullwidth
                    type="number"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.fonenumber || ""}
                    errorText={touched.fonenumber && errors.fonenumber}
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
                    value={values.cep || ""}
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
                    value={values.address || ""}
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
                    value={values.bairro || ""}
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
                    label="Cidade"
                    placeholder="Cidade"
                    fullwidth
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.cidade || ""}
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
                    value={values.uf || ""}
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

export const getServerSideProps: GetServerSideProps = onlyAdmin(
  true,
  async () => {
    return {
      props: {},
    };
  }
);

AddUser.layout = AppLayout;

export default AddUser;
