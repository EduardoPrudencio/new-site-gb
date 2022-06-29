/* eslint-disable jsx-a11y/anchor-is-valid */
import Link from "next/link";

import React, { useCallback, useContext, useState } from "react";

import { theme } from "@utils/theme";
import { useFormik } from "formik";
import * as yup from "yup";

import { AuthCotext } from "@context/AuthContext";

import Button from "../buttons/Button";
import IconButton from "../buttons/IconButton";
import FlexBox from "../FlexBox";
import Icon from "../icon/Icon";
import TextField from "../text-field/TextField";
import { H3, H5, H6, SemiSpan } from "../Typography";
import { StyledSessionCard } from "./SessionStyle";

const initialValues = {
  login: "",
  password: "",
};

const formSchema = yup.object().shape({
  login: yup
    .string()
    .required("O campo login é obrigatório"),
  password: yup.string().required("O campo senha é obrigatório"),
});

const Signin = function BuildSignIn() {
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const [showMessage, setShowMessage] = useState(false);

  const { signIn } = useContext(AuthCotext);

  const togglePasswordVisibility = useCallback(() => {
    setPasswordVisibility((visible) => !visible);
  }, []);

  const handleFormSubmit = async (values) => {
    const error = await signIn(values);
    setShowMessage(error);
  };

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      onSubmit: handleFormSubmit,
      initialValues,
      validationSchema: formSchema,
    });

  return (
    <StyledSessionCard mx="auto" my="2rem" boxShadow="large">
      <form className="content" onSubmit={handleSubmit}>
        <H3 textAlign="center" mb="0.5rem">
          Faça login
        </H3>
        <H5
          fontWeight="600"
          fontSize="12px"
          color="gray.800"
          textAlign="center"
          mb="2.25rem"
        >
          Preencha seu e-mail ou login e sua senha para continuar
        </H5>

        {showMessage && (
          <H5
            fontWeight="600"
            fontSize="12px"
            color={theme.colors.error.main}
            textAlign="center"
            mb="2.25rem"
          >
            Usuário ou senha inválidos
          </H5>
        )}

        <TextField
          mb="0.75rem"
          name="login"
          placeholder="Digite seu e-mail ou nome de usuário"
          label="Email ou nome de usuário"
          type="text"
          fullwidth
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.login || ""}
          errorText={touched.login && errors.login}
          data-cy="username"
        />
        <TextField
          mb="1rem"
          name="password"
          placeholder="*********"
          autoComplete="on"
          type={passwordVisibility ? "text" : "password"}
          label="Senha"
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
          data-cy="password"
        />

        <Button
          mb="1.65rem"
          variant="contained"
          bg={theme.colors.primary[500]}
          color="primary"
          type="submit"
          fullwidth
          data-cy="login"
        >
          Login
        </Button>

        {/* <FlexBox justifyContent="center" mb="1.25rem">
          <SemiSpan>Não tem uma conta?</SemiSpan>
          <Link href="/signup">
            <a>
              <H6
                ml="0.5rem"
                borderBottom="1px solid"
                borderColor="gray.900"
                data-cy="signup"
              >
                Cadastre-se
              </H6>
            </a>
          </Link>
        </FlexBox> */}
      </form>

      {/* <FlexBox justifyContent="center" bg="gray.200" py="19px">
        <SemiSpan>Esqueceu sua senha?</SemiSpan>
        <Link href="/password/new">
          <a>
            <H6
              ml="0.5rem"
              borderBottom="1px solid"
              borderColor="gray.900"
              data-cy="password-recovery"
            >
              Recupere aqui
            </H6>
          </a>
        </Link>
      </FlexBox> */}
    </StyledSessionCard>
  );
};

export default Signin;
