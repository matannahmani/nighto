import type { AppType } from 'next/app';
import type { Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';

import { api } from '../utils/api';

import '../styles/globals.css';
import { SSRProvider } from 'react-aria';
import Layout from '@/component/layout/Layout';
import '@/styles/globals.css';
import { ChakraProvider } from '@chakra-ui/react';
import { theme } from '@/theme';
import NoSSR from '@/component/common/NoSSR';
import Head from 'next/head';
const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
        <title>Nighto - Find the Best Bars and Clubs for Your Night Out</title>
        <meta name="robots" content="index, follow" />
        <meta
          name="keywords"
          content="bars, clubs, pubs, itineraries, nightlife, location, preferences"
        />
        <meta name="author" content="Nighto.app" />
        <meta name="theme-color" content="#dcb6f1" />
        <link rel="canonical" href="https://nighto.app/" />
        <meta
          property="og:title"
          content="Nighto - Find the Best Bars and Clubs for Your Night Out"
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://nighto.app/" />
        <meta
          property="og:image"
          content="https://nighto.app/images/logo-social.png"
        />
        <meta
          property="og:description"
          content="Find the best bars, pubs, and clubs for your night out with Nighto. Discover new venues, create your own itinerary, and explore popular places and trending itineraries."
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Nighto - Find the Best Bars and Clubs for Your Night Out"
        />
        <meta
          name="twitter:description"
          content="Find the best bars, pubs, and clubs for your night out with Nighto. Discover new venues, create your own itinerary, and explore popular places and trending itineraries."
        />
        <meta
          name="twitter:image"
          content="https://nighto.app/images/logo-social.png"
        />
      </Head>
      <ChakraProvider theme={theme}>
        <SessionProvider session={session}>
          <SSRProvider>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </SSRProvider>
        </SessionProvider>
      </ChakraProvider>
    </>
  );
};

export default api.withTRPC(MyApp);
