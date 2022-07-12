import Link from "next/link";
import { useRouter } from "next/router";

import Button from "@component/buttons/Button";
import FlexBox from "@component/FlexBox";
import { H1, H3 } from "@component/Typography";

const Error404 = function Error() {
  const router = useRouter();

  const handleGoBack = async () => {
    router.back();
  };

  return (
    <FlexBox
      flexDirection="column"
      minHeight="100vh"
      justifyContent="center"
      alignItems="center"
      px="1rem"
    >
      <H1>Ops</H1>
      <H3>Não há nada aqui. </H3>
      <FlexBox flexWrap="wrap">
        <Button
          variant="outlined"
          color="primary"
          m="0.5rem"
          onClick={handleGoBack}
        >
          Voltar
        </Button>
        <Link href="/campos-dos-goytacazes">
          <Button variant="contained" color="primary" m="0.5rem">
            Ir para a Home
          </Button>
        </Link>
      </FlexBox>
    </FlexBox>
  );
};

export default Error404;
