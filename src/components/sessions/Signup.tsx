import Link from "next/link";
import Router, { useRouter } from "next/router";

import React, { useEffect, useState } from "react";

import { theme } from "@utils/theme";
import { setCookies } from "cookies-next";
import { useFormik } from "formik";
import { SignUpCall } from "services/api/signup";
import * as yup from "yup";

import Button from "../buttons/Button";
import IconButton from "../buttons/IconButton";
import CheckBox from "../CheckBox";
import FlexBox from "../FlexBox";
import Icon from "../icon/Icon";
import TextField from "../text-field/TextField";
import { H3, H5, H6, SemiSpan } from "../Typography";
import { StyledSessionCard } from "./SessionStyle";

interface ISignupProps {
  voucher?: string | string[];
  hasVoucher?: boolean;
}

const Signup: React.FC<ISignupProps> = ({ hasVoucher = false, voucher }) => {
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState();

  const { query } = useRouter();

  if (!hasVoucher) voucher = "";

  const togglePasswordVisibility = () => {
    setPasswordVisibility((visible) => !visible);
  };

  function showErrorMessages(messages) {
    const errors = messages.map(m => <p>{m}</p>);
    setErrorMessage(errors);
  }

  const handleFormSubmit = async (values) => {

    if (typeof voucher !== "undefined" && voucher !== "")
     values.voucher = voucher;

    const response = await SignUpCall(values);

    if (response === 200 || response === 201) { 
      Router.push("/campos-dos-goytacazes");
    }
      else{
      setShowErrorMessage(true);
      showErrorMessages(formatter(response.data));
    }
  };

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      onSubmit: handleFormSubmit,
      initialValues,
      validationSchema: formSchema,
    });

  const VerifyCampaignCookie = () => {
    const cookieValue = query.campaign ? query.campaign.toString() : "";
    setCookies("campaign", cookieValue);
  };

  useEffect(() => {
    VerifyCampaignCookie();
  });

  return (
    <StyledSessionCard mx="auto" my="2rem" boxShadow="large">
      <form className="content" onSubmit={handleSubmit}>
        <H3 textAlign="center" fontSize="25px" mb="0.625rem">
          Crie a sua conta
        </H3>
        <H5
          fontWeight="600"
          fontSize="12px"
          color="gray.800"
          textAlign="center"
          mb="2.188rem"
        >
          Preencha todos os campos para continuar
        </H5>

        {showErrorMessage && (
        <H5 fontSize="14px" color={theme.colors.red[500]} textAlign="center">
            {errorMessage}
        </H5>
      )}

        <TextField
          mb="0.5rem"
          name="name"
          label="Nome completo"
          data-cy="nickname"
          placeholder="Seu nome e sobrenome"
          fullwidth
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.name || ""}
          errorText={touched.name && errors.name}
        />
        <TextField
          mb="0.5rem"
          name="email"
          placeholder="exmplo@mail.com"
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
        {hasVoucher && (
          <TextField
            mb="0.5rem"
            name="voucher"
            label="Voucher"
            data-cy="voucher"
            placeholder="Voucher"
            fullwidth
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.voucher || voucher || ""}
          />
        )}

        <CheckBox
          mb="1rem"
          name="receiveAboutProductsAndServices"
          color="secondary"
          checked={values.receiveAboutProductsAndServices}
          onChange={handleChange}
          label="Desejo receber ofertas de produtos e serviços"
        />

        <CheckBox
          mb="2.438rem"
          name="agreementTerms"
          color="secondary"
          data-cy="chk-terms"
          checked={values.agreementTerms}
          onChange={handleChange}
          label={
            <FlexBox>
              Concordo com os
              <a
                href="https://www.bebanca.app/termos-de-uso/"
                target="_blank"
                rel="noreferrer"
              >
                <H6 ml="0.5rem" borderBottom="1px solid" borderColor="gray.900">
                  Termos de Uso
                </H6>
              </a>
            </FlexBox>
          }
          errorText={touched.agreementTerms && errors.agreementTerms}
        />

        <Button
          mb="1.25rem"
          variant="contained"
          color="primary"
          data-cy="cadastrar"
          backgroundColor={theme.colors.primary[500]}
          type="submit"
          fullwidth
        >
          Criar Conta
        </Button>
      </form>
      <FlexBox justifyContent="center" bg="gray.200" py="19px">
        <SemiSpan>Já possui uma conta?</SemiSpan>
        {typeof window !== "undefined" && (
          <Link href={`/signin${window.location.search}`}>
            <a>
              <H6 ml="0.5rem" borderBottom="1px solid" borderColor="gray.900">
                Faça login
              </H6>
            </a>
          </Link>
        )}
      </FlexBox>
    </StyledSessionCard>
  );
};

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
  email: yup.string().email("email inválido").required("${path} é obrigatório"),
  password: yup.string().required("${path} é obrigatório"),
  agreementTerms: yup
    .boolean()
    .required()
    .oneOf([true], "você deve concordar com os termos e condições."),
});

export default Signup;
