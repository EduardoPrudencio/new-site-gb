import React from "react";

import AppLayout from "@component/layout/AppLayout";
import { onlyGuest } from "@utils/onlyGuest";
import { GetServerSideProps } from "next";

import FlexBox from "../components/FlexBox";
import Signin from "../components/sessions/Signin";

function SigninPage() {
  return (
    <FlexBox
      flexDirection="column"
      minHeight="100vh"
      alignItems="center"
      justifyContent="center"
    >
      <Signin />
    </FlexBox>
  );
}

SigninPage.layout = AppLayout;

export const getServerSideProps: GetServerSideProps = onlyGuest(async () => {
  return {
    props: {},
  };
});

export default SigninPage;
