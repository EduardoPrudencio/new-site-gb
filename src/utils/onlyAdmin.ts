import { getCookie } from "cookies-next";
import {
  GetServerSideProps,
  GetServerSidePropsContext,
  GetServerSidePropsResult,
} from "next";

export function onlyAdmin<P>(isAdmin: boolean, fn: GetServerSideProps<P>) {
  return async (
    ctx: GetServerSidePropsContext
  ): Promise<GetServerSidePropsResult<P>> => {

    const gym = getCookie("gym.name", {
        req: ctx.req,
        res: ctx.res,
      });

    if (!isAdmin) {
      return {
        redirect: {
          destination: typeof gym !== "undefined" ? `/${gym}` : "/",
          permanent: false,
        },
      };
    }

    return fn(ctx);
  };
}
