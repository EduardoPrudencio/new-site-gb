import Link from "next/link";
import { useRouter } from "next/router";

import { toast } from "react-toastify";

import { theme } from "@utils/theme";
import { useFormik } from "formik";
import * as yup from "yup";

import { startPasswordRecovery } from "@services/api/users/password";

import { getCookie } from "cookies-next";
import Button from "../buttons/Button";
import FlexBox from "../FlexBox";
import TextField from "../text-field/TextField";
import { H3, H5, H6, SemiSpan } from "../Typography";
import { StyledSessionCard } from "./SessionStyle";

function PasswordRecovery() {
  const router = useRouter();

  const handleFormSubmit = async ({ email }) => {
    startPasswordRecovery({ email });
    toast.success("Enviaremos um e-mail para você.", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
    const gymSlug = getCookie("gym.name");
    router.push(`/${gymSlug}`);
  };

  const initialValues = {
    email: "",
  };

  const formSchema = yup.object().shape({
    email: yup
      .string()
      .email("e-mail inválido")
      .required("O campo e-mail é obrigatório"),
  });

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
          Recupere sua senha
        </H3>
        <H5
          fontWeight="600"
          fontSize="12px"
          color="gray.800"
          textAlign="center"
          mb="2.25rem"
        >
          Digite o e-mail utilizado para criação da sua conta no Bebanca
        </H5>

        <TextField
          mb="0.75rem"
          name="email"
          placeholder="Digite seu e-mail"
          label="E-mail"
          type="email"
          fullwidth
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.email || ""}
          errorText={touched.email && errors.email}
          data-cy="email"
        />

        <Button
          mb="1.65rem"
          variant="contained"
          bg={theme.colors.primary[500]}
          color="primary"
          type="submit"
          fullwidth
          data-cy="send-email"
        >
          Enviar e-mail
        </Button>

        <FlexBox justifyContent="center" mb="1.25rem">
          <SemiSpan>Não tem uma conta?</SemiSpan>
          <Link href="/signup">
            <a>
              <H6 ml="0.5rem" borderBottom="1px solid" borderColor="gray.900">
                Cadastre-se
              </H6>
            </a>
          </Link>
        </FlexBox>
      </form>

      <FlexBox justifyContent="center" bg="gray.200" py="19px">
        <SemiSpan>Lembrou?</SemiSpan>
        <Link href="/signin">
          <a>
            <H6 ml="0.5rem" borderBottom="1px solid" borderColor="gray.900">
              Faça Login
            </H6>
          </a>
        </Link>
      </FlexBox>
    </StyledSessionCard>
  );
}

export default PasswordRecovery;
