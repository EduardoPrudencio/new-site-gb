import Box from "@component/Box";
import AppLayout from "@component/layout/AppLayout";
import Navbar from "@component/navbar/Navbar";
import { H5 } from "@component/Typography";
import { onlyAuth } from "@utils/onlyAuth";
import { GetServerSideProps } from "next";

function AddUser() {
  return (
    <>
      <Navbar />
      <Box
        display="flex"
        flexDirection="row"
        alignItems="center"
        justifyContent="center"
        marginTop="20px"
      >
        <Box
          display="flex"
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between"
          bg="#FFFFFF"
          width="1000px"
        >
          <H5>Add user</H5>
        </Box>
      </Box>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = onlyAuth(async () => {
  return {
    props: {},
  };
});

AddUser.layout = AppLayout;

export default AddUser;
