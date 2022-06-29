import React from "react";

import AppLayout from "@component/layout/AppLayout";

import FlexBox from "../../../components/FlexBox";
import PasswordRecovery from "../../../components/sessions/PasswordRecovery";

function PasswordRecoveryPage() {
  return (
    <FlexBox
      flexDirection="column"
      minHeight="100vh"
      alignItems="center"
      justifyContent="center"
    >
      <PasswordRecovery />
    </FlexBox>
  );
}

PasswordRecoveryPage.layout = AppLayout;

export default PasswordRecoveryPage;
