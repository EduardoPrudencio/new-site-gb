import Router from "next/router";

import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import { authCookieKeys } from "@utils/constants";
import { saveSession } from "@utils/saveSession";
import { removeCookies, checkCookies } from "cookies-next";
import { AuthContextType, SignInData, User } from "types";

import { SigninCall } from "@services/api/signin";
import { me } from "@services/api/users/me";

export const AuthCotext = createContext({} as AuthContextType);

export function AuthProvider({ children }) {
  const [user, setUser] = useState<User | null>(null);
  const isAuthenticated = !!user;
  const hasCookies =
    checkCookies(authCookieKeys.refresh) && checkCookies(authCookieKeys.token);

  // type UserData = {
  //   token: { token: string; refreshToken: string };
  // };

  const fillUserData = useCallback(({ token}) => {
    // saveSession({
    //   token: token.token,
    //   refreshToken: token.refreshToken,
    // });

    // setUser({
    //   id: custumer.id,
    //   name: custumer.nickname,
    //   email: custumer.email,
    //   premium: custumer.permissions.subscription.premium,
    //   showNewspaper: custumer.permissions.newspaper.show,
    //   showMagazine: custumer.permissions.magazine.show,
    // });
  }, []);

  const signIn = useCallback(
    async (credentials: SignInData) => {
      let error = false;
      try {
        const { data: session } = await SigninCall({
          login: credentials.login,
          password: credentials.password,
        });

        fillUserData(session);
        const { goTo } = Router.query;
        if (goTo) {
          Router.push(goTo as string);
        } else {
          Router.push("/");
        }
      } catch {
        error = true;
      }
      return error;
    },
    [fillUserData]
  );

  function logOut() {
    removeCookies(authCookieKeys.refresh);
    removeCookies(authCookieKeys.token);
  }

  useEffect(() => {
    (async () => {
      if (hasCookies) {
        const reloadedUser = await me();
        setUser(reloadedUser);
      }
    })();
  }, [hasCookies]);

  const context = useMemo(
    () => ({ user, isAuthenticated, signIn, logOut }),
    [isAuthenticated, signIn, user]
  );

  return <AuthCotext.Provider value={context}>{children}</AuthCotext.Provider>;
}
