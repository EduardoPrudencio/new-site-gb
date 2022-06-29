import { useRouter } from "next/router";

import React from "react";

import AppLayout from "@component/layout/AppLayout";

import FlexBox from "../../components/FlexBox";
import Signup from "../../components/sessions/Signup";

function SignUpPage() {
  const { query } = useRouter();
  const { slug } = query;

  return (
    <FlexBox
      flexDirection="column"
      minHeight="100vh"
      alignItems="center"
      justifyContent="center"
    >
      <Signup hasVoucher={slug === "voucher"} voucher={query.code} />
    </FlexBox>
  );
}

SignUpPage.layout = AppLayout;

export default SignUpPage;
