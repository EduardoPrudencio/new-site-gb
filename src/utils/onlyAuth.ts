import { getCookie } from "cookies-next";
import {
  GetServerSideProps,
  GetServerSidePropsContext,
  GetServerSidePropsResult,
} from "next";

import { authCookieKeys } from "./constants";

export function onlyAuth<P>(fn: GetServerSideProps<P>) {
  return async (
    ctx: GetServerSidePropsContext
  ): Promise<GetServerSidePropsResult<P>> => {
    const token = getCookie(authCookieKeys.token, {
      req: ctx.req,
      res: ctx.res,
    });

    if (!token) {
      return {
        redirect: {
          destination: `/signin?goTo=${ctx.resolvedUrl}`,
          permanent: false,
        },
      };
    }

    return fn(ctx);
  };
}
