import "react-toastify/dist/ReactToastify.css";

import Head from "next/head";
import Router from "next/router";

import React, { Fragment } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

import NProgress from "nprogress";
import { ThemeProvider } from "styled-components";
import { ToastContainer } from "react-toastify";

import { AppProvider } from "../contexts/app/AppContext";
import { AuthProvider } from "../contexts/AuthContext";
import { GlobalStyles } from "../utils/globalStyles";
import { theme } from "../utils/theme";

// Binding events.
Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

NProgress.configure({ showSpinner: false });

function App({ Component, pageProps }: any) {
  const Layout = Component.layout || Fragment;
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ThemeProvider theme={theme}>
          <Head>
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1"
            />
            <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
            <script
              async
              src="https://www.googletagmanager.com/gtag/js?id=G-J24JQRW1D8"
            />
            <script
              dangerouslySetInnerHTML={{
                __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-J24JQRW1D8');
            `,
              }}
            />
          </Head>
          <GlobalStyles />
          <AppProvider>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </AppProvider>
          <ToastContainer />
        </ThemeProvider>
      </AuthProvider>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

// Only uncomment this method if you have blocking data requirements for
// every single page in your application. This disables the ability to
// perform automatic static optimization, causing every page in your app to
// be server-side rendered.
//
// App.getInitialProps = async (appContext) => {
//   // calls page's `getInitialProps` and fills `appProps.pageProps`
//   const appProps = await App.getInitialProps(appContext);
//
//   return { ...appProps }
// }

export default App;
