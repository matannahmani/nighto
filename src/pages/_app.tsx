import type { AppType } from 'next/app';
import type { Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';

import { api } from '../utils/api';

import '../styles/globals.css';
import { ChakraProvider } from '@chakra-ui/react';
import { SSRProvider } from 'react-aria';
import Layout from '@/component/layout/Layout';
import { theme } from '@/theme';

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <ChakraProvider theme={theme}>
      <SessionProvider session={session}>
        <SSRProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </SSRProvider>
      </SessionProvider>
    </ChakraProvider>
  );
};

export default api.withTRPC(MyApp);
