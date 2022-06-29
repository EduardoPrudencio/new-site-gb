import React from "react";

import AppLayout from "@component/layout/AppLayout";

import FlexBox from "../../components/FlexBox";
import Signup from "../../components/sessions/Signup";

function SignUpPage() {
  return (
    <FlexBox
      flexDirection="column"
      minHeight="100vh"
      alignItems="center"
      justifyContent="center"
    >
      <Signup />
    </FlexBox>
  );
}

SignUpPage.layout = AppLayout;

export default SignUpPage;
