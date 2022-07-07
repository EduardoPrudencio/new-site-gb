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
import { removeCookies, checkCookies, getCookie } from "cookies-next";
import { AuthContextType, SignInData, User } from "types";

import { SigninCall } from "@services/api/signin";
import { me } from "@services/api/users/me";

export const AuthCotext = createContext({} as AuthContextType);

export function AuthProvider({ children }) {
  const [user, setUser] = useState<User | null>(null);
  const isAuthenticated = !!user;
  const hasCookies =
    checkCookies(authCookieKeys.refresh) && checkCookies(authCookieKeys.token);

  type UserData = {
     token: string; refreshToken: string ;
  };

  const fillUserData = useCallback((token, refreshToken, client) => {

    saveSession({
      token: token,
      refreshToken: refreshToken,
    });

    setUser({
      id: client.id,
      name: client.name,
      email: client.email,
      lastName: client.lastName,
      userRoles: client.userRoles,
      birthDate: client.birthDate,
      image: client.image,
      phoneNumber: client.phoneNumber,
      active: client.active
    });
  }, []);

  const signIn = useCallback(
    async (credentials: SignInData) => { 
      let error = false;
      try {
        const { data: session } = await SigninCall({
          login: credentials.login,
          password: credentials.password,
        });
        
        fillUserData(session.access_token, session.refresh_token, session.client);
        const { goTo } = Router.query;
        if (goTo) {
          Router.push(goTo as string);
        } else {
          const gym = getCookie(authCookieKeys.gymName);
          Router.push(`/${gym}`);
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
