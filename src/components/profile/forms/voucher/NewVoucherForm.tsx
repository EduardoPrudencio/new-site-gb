import { useState } from "react";

import Box from "@component/Box";
import Button from "@component/buttons/Button";
import TextField from "@component/text-field/TextField";
import { H5 } from "@component/Typography";
import { authCookieKeys } from "@utils/constants";
import { theme } from "@utils/theme";
import { getCookie } from "cookies-next";
import { useFormik } from "formik";
import { AddNew } from "services/api/vouchers";
import styeld from "styled-components";
import * as yup from "yup";

const initialValues = {
  voucher: "",
};

const formSchema = yup.object().shape({
  voucher: yup.string().required("Um código deve ser informado"),
});

const FormTitle = styeld.label`
  font-size: 25px;
  font-weight: bold;
`;

const FormSubTitle = styeld.label`
  font-size: 12px;
`;

export const NewVoucherForm = function BuildNewVoucherForm() {
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  function ShowAlertMessage(success: boolean) {
    /* eslint-disable-next-line no-unused-expressions */
    success ? setShowSuccessMessage(true) : setShowErrorMessage(true);
    setTimeout(() => {
      setShowErrorMessage(false);
      setShowSuccessMessage(false);
    }, 3000);
  }

  const handleFormSubmit = async (values) => {
    const token = getCookie(authCookieKeys.token);
    try {
      const { status } = await AddNew(token, values.voucher);

      if (status === 200) {
        ShowAlertMessage(true);
      }
    } catch {
      ShowAlertMessage(false);
    }
  };
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      onSubmit: handleFormSubmit,
      initialValues,
      validationSchema: formSchema,
    });

  return (
    <>
      {showSuccessMessage && (
        <H5 fontSize="16px" color={theme.colors.green[400]} textAlign="center">
          <p>Voucher aplicado com sucesso!</p>
        </H5>
      )}

      {showErrorMessage && (
        <H5 fontSize="16px" color={theme.colors.red[500]} textAlign="center">
          <p>O voucher informado não é válido</p>
        </H5>
      )}

      <Box
        width="458px"
        height="270px"
        display="flex"
        pr="40px"
        pl="40px"
        flexDirection="column"
      >
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          mt="20px"
          mb="35px"
        >
          <FormTitle>Novo voucher</FormTitle>
          <FormSubTitle>Digite o código do seu voucher</FormSubTitle>
        </Box>

        <form onSubmit={handleSubmit}>
          <TextField
            mb="0.75rem"
            name="voucher"
            placeholder="**********"
            label="Código do Voucher"
            type="text"
            fullwidth
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.voucher || ""}
            errorText={touched.voucher && errors.voucher}
          />
          <Button
            mb="1.65rem"
            variant="contained"
            color="primary"
            type="submit"
            fullwidth
          >
            Ativar Voucher
          </Button>
        </form>
      </Box>
    </>
  );
};
