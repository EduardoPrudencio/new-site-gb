import { getCookie } from "cookies-next";
import {
  GetServerSideProps,
  GetServerSidePropsContext,
  GetServerSidePropsResult,
} from "next";
import { authCookieKeys } from "./constants";
import jwt_decode from "jwt-decode";
import { User } from "types";

export function onlyAdmin<P>(isAdmin: boolean, fn: GetServerSideProps<P>) {
  return async (
    ctx: GetServerSidePropsContext
  ): Promise<GetServerSidePropsResult<P>> => {

  const token = getCookie(authCookieKeys.token, {
    req: ctx.req,
    res: ctx.res,
  });
    
  const tokenDecoded =  jwt_decode(token?.toString());
  // console.log("#############$$$$$$$$$$$$$$$$$$ ",JSON.parse(JSON.stringify(tokenDecoded)));

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
