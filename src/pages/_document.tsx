import Document, { Head, Html, Main, NextScript } from "next/document";

import { ServerStyleSheet } from "styled-components";

export default class extends Document {
  static async getInitialProps(ctx) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
            sheet.collectStyles(<App {...props} />),
        });

      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      };
    } finally {
      sheet.seal();
    }
  }

  render() {
    return (
      <Html lang="pt-BR">
        <Head>
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/apple-touch-icon.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/favicon-16x16.png"
          />
          <link rel="manifest" href="/site.webmanifest" />
          <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#fff" />
          <meta name="msapplication-TileColor" content="#ffffff" />
          <meta name="theme-color" content="#ffffff" />
          <link
            href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600;700;900&display=swap"
            rel="stylesheet"
          />
          <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@100;400;700&display=swap"
                rel="stylesheet"
          />
          <meta
            name="title"
            content="Gracie Barra"
          />
          <meta
            name="description"
            content="Conheça o maior grupo de Jiu-jitsu do mundo."
          />

          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://www.graciebarrasystem.com.br/campos-dos-goytacazes" />
          <meta
            property="og:title"
            content="Gracie Barra"
          />
          <meta
            property="og:description"
            content="Conheça o maior grupo de Jiu-jitsu do mundo."
          />
          <meta property="og:image" content="" />

          <meta
            property="twitter:card"
            content="/assets/images/social-banner.png"
          />
          <meta property="twitter:url" content="https://www.graciebarrasystem.com.br/campos-dos-goytacazes" />
          <meta
            property="twitter:title"
            content="Gracie Barra"
          />
          <meta
            property="twitter:description"
            content="Conheça o maior grupo de Jiu-jitsu do mundo."
          />
          <meta
            property="twitter:image"
            content="/assets/images/social-banner.png"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
