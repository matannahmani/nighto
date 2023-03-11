// pages/_document.ts

import { ColorModeScript, extendTheme } from '@chakra-ui/react';
import { Html, Head, Main, NextScript } from 'next/document';
import NextDocument from 'next/document';
import { theme } from '@/theme';
import Script from 'next/script';
// eslint-disable-next-line @typescript-eslint/no-unsafe-argument

export default class Document extends NextDocument {
  render() {
    return (
      <Html>
        <Head />
        <body>
          {/* 👇 Here's the script */}
          <ColorModeScript initialColorMode={theme.config.initialColorMode} />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
