import { useRouter } from "next/router";

import React, { useCallback, useState } from "react";
import { toast } from "react-toastify";

import { theme } from "@utils/theme";
import { getCookie } from "cookies-next";
import { useFormik } from "formik";
import * as yup from "yup";

import { ChangePassword } from "@services/api/student";

import Button from "../buttons/Button";
import IconButton from "../buttons/IconButton";
import Icon from "../icon/Icon";
import TextField from "../text-field/TextField";
import { H3, H5 } from "../Typography";
import { StyledSessionCard } from "./SessionStyle";

function PasswordEdit({ UserId }: { UserId: string | string[] }) {
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const [passwordConfirmationVisibility, setPasswordConfirmationVisibility] =
    useState(false);

  const router = useRouter();

  const togglePasswordVisibility = useCallback(() => {
    setPasswordVisibility((visible) => !visible);
  }, []);

  const togglePasswordConfirmationVisibility = useCallback(() => {
    setPasswordConfirmationVisibility((visible) => !visible);
  }, []);

  const handleFormSubmit = async ({ password }) => {
    try {
      const response = await ChangePassword(UserId, password);

      if (response.statusCode === 204) {
        toast.success("Sua senha foi alterada com sucesso");
        const gymSlug = getCookie("gym.name");
        router.push(`/${gymSlug}`);
      }
    } catch (error) {
      // toast.error("Houve um erro. Tente novamente");
    }
  };

  const formSchema = yup.object().shape({
    password: yup.string().required("O campo senha é obrigatório"),
    passwordConfirmation: yup
      .string()
      .oneOf([yup.ref("password"), null], "Os campos devem ser iguais")
      .required("O campo confirme sua senha é obrigatório"),
  });

  const initialValues = {
    password: "",
    passwordConfirmation: "",
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
          Nova senha
        </H3>
        <H5
          fontWeight="600"
          fontSize="12px"
          color="gray.800"
          textAlign="center"
          mb="2.25rem"
        >
          Informe e confirme sua nova senha para continuar
        </H5>

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

        <TextField
          mb="1rem"
          name="passwordConfirmation"
          placeholder="*********"
          autoComplete="on"
          type={passwordConfirmationVisibility ? "text" : "password"}
          label="Confirme sua senha"
          fullwidth
          endAdornment={
            <IconButton
              size="small"
              type="button"
              p="0.25rem"
              mr="0.25rem"
              color={passwordConfirmationVisibility ? "gray.700" : "gray.600"}
              onClick={togglePasswordConfirmationVisibility}
            >
              <Icon variant="small" defaultcolor="currentColor">
                {passwordConfirmationVisibility ? "eye-alt" : "eye"}
              </Icon>
            </IconButton>
          }
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.passwordConfirmation || ""}
          errorText={
            touched.passwordConfirmation && errors.passwordConfirmation
          }
          data-cy="passwordConfirmation"
        />

        <Button
          mb="1.65rem"
          variant="contained"
          bg={theme.colors.primary[500]}
          color="primary"
          type="submit"
          fullwidth
          data-cy="save"
        >
          Salvar
        </Button>
      </form>
    </StyledSessionCard>
  );
}

export default PasswordEdit;
