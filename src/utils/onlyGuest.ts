import { getCookie } from "cookies-next";
import {
  GetServerSideProps,
  GetServerSidePropsContext,
  GetServerSidePropsResult,
} from "next";

import { authCookieKeys } from "./constants";

export function onlyGuest<P>(fn: GetServerSideProps<P>) {
  return async (
    ctx: GetServerSidePropsContext
  ): Promise<GetServerSidePropsResult<P>> => {
    const token = getCookie(authCookieKeys.token);

    if (token) {
      return {
        redirect: {
          destination: `/account/profile`,
          permanent: false,
        },
      };
    }

    return fn(ctx);
  };
}
