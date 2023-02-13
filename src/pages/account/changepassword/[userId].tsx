import { useRouter } from "next/router";

import React, { useContext } from "react";

import AppLayout from "@component/layout/AppLayout";
import PasswordEdit from "@component/sessions/PasswordEdit";
import { onlyAuth } from "@utils/onlyAuth";
import { GetServerSideProps } from "next";
import styled from "styled-components";

import { AuthCotext } from "@context/AuthContext";

const Body = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 70.3vh;
`;

function ChangePassword() {
  const { query } = useRouter();
  const { userId } = query;
  const { user } = useContext(AuthCotext);

  return (
    <Body>
      <PasswordEdit UserId={userId} Email={user.email} />
    </Body>
  );
}

export const getServerSideProps: GetServerSideProps = onlyAuth(async () => {
  return {
    props: {},
  };
});

ChangePassword.layout = AppLayout;

export default ChangePassword;
