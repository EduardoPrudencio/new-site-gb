import React, { useContext } from "react";
import { toast } from "react-toastify";
import Avatar from "react-user-avatar";

import Box from "@component/Box";
import Button from "@component/buttons/Button";
import Card from "@component/Card";
import FlexBox from "@component/FlexBox";
import Grid from "@component/grid/Grid";
import DashboardLayout from "@component/layout/CustomerDashboardLayout";
import DashboardPageHeader from "@component/layout/DashboardPageHeader";
import TextField from "@component/text-field/TextField";
import Typography, { H5 } from "@component/Typography";
import { onlyAuth } from "@utils/onlyAuth";
import { theme } from "@utils/theme";
import { useFormik } from "formik";
import { GetServerSideProps } from "next";
import styled from "styled-components";
import * as yup from "yup";
import useWindowSize from "@hook/useWindowSize";
import { UserUpdate } from "@services/api/signin";
import { AuthCotext } from "@context/AuthContext";

export const StyledNewspapersSingle = styled.div`
  width: 650px;

  @media only screen and (max-width: 638px) {
    width: 510px;
  }

  @media only screen and (max-width: 512px) {
    width: 380px;
  }

  @media only screen and (max-width: 414px) {
    width: 350px;
  }

  @media only screen and (max-width: 375px) {
    width: 345px;
  }

  @media only screen and (max-width: 360px) {
    width: 320px;
  }
  @media only screen and (max-width: 280px) {
    width: 250px;
  }
`;

const Label = styled.label``;

type BoxValues = {
  name: string;
  email: string;
  id: string;
};

function Profile() {
  const [width] = useWindowSize();
  const { user } = useContext(AuthCotext);

  const handleFormSubmit = async ({ email, name }: BoxValues) => {
    const { status } = await UserUpdate({ id: user.id, email, name });

    if (status === 200) toast.success("Dados atualizas com sucesso!");
  };

  const initialValues = {
    name: "",
    email: "",
  };

  const formSchema = yup.object().shape({
    name: yup.string().required("O nome deve ser preenchido."),
    email: yup
      .string()
      .email("Esse email não é válido")
      .required("Um email válido deve ser informado."),
  });

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      onSubmit: handleFormSubmit,
      initialValues,
      validationSchema: formSchema,
    });

  return (
    <StyledNewspapersSingle>
      <DashboardPageHeader iconName="user_filled" title="Meu Perfil" />
      <Box mb="30px">
        <Grid container spacing={6}>
          <Grid item lg={12} md={6} sm={12} xs={12}>
            <FlexBox as={Card} p="14px 32px" height="100%" alignItems="center">
              {user && width > 360 && (
                <Avatar size="64" name={user.name} color="#ccc" />
              )}
              <Box ml="12px" flex="1 1 0">
                <FlexBox
                  flexWrap="wrap"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <div>
                    <H5 my="0px">{user && user.name}</H5>
                    <FlexBox alignItems="center">
                      <Label>{user && user.email}</Label>
                    </FlexBox>
                  </div>

                  <Typography
                    ontSize="14px"
                    color="text.hint"
                    letterSpacing="0.2em"
                  >
                    {user && user.premium ? "Premium" : "Free"}
                  </Typography>
                </FlexBox>
              </Box>
            </FlexBox>
          </Grid>
        </Grid>
      </Box>

      <Box
        borderRadius="10px"
        backgroundColor="#FFFFFF"
        p="10px 0 0 10px"
        shadow={6}
      >
        <form className="content" onSubmit={handleSubmit}>
          <Box
            mr="10px"
            display="flex"
            flexDirection="column"
            alignItems="start"
          >
            <TextField
              mb="0.75rem"
              name="name"
              label="Nome"
              placeholder="Nome do usuário"
              fullwidth
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.name || user?.name}
              errorText={touched.name && errors.name}
            />

            <TextField
              mb="0.75rem"
              name="email"
              placeholder="exmple@mail.com"
              label="Email"
              type="email"
              fullwidth
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.email || user?.email}
              errorText={touched.name && errors.email}
            />

            <Button
              mb="1.65rem"
              variant="contained"
              color="primary"
              backgroundColor={theme.colors.primary[500]}
              type="submit"
            >
              Salvar Alterações
            </Button>
          </Box>
        </form>
      </Box>
    </StyledNewspapersSingle>
  );
}

export const getServerSideProps: GetServerSideProps = onlyAuth(async () => {
  return {
    props: {},
  };
});

Profile.layout = DashboardLayout;

export default Profile;
