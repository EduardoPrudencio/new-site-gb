import AppLayout from "@component/layout/AppLayout";
import { GetServerSideProps } from "next";

import { isValidToken } from "@services/api/users/password";

import FlexBox from "../../../components/FlexBox";
import PasswordEdit from "../../../components/sessions/PasswordEdit";

function PasswordEditPage({ token }: { token: string }) {
  return (
    <FlexBox
      flexDirection="column"
      minHeight="100vh"
      alignItems="center"
      justifyContent="center"
    >
      <PasswordEdit token={token} />
    </FlexBox>
  );
}

PasswordEditPage.layout = AppLayout;

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const token = params.id;

  const isValid = await isValidToken(token);

  if (!isValid) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      token,
    },
  };
};

export default PasswordEditPage;
