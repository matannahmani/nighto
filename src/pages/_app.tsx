import { type AppType } from 'next/app';
import { type Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';

import { api } from '../utils/api';

import '../styles/globals.css';
import { ChakraProvider } from '@chakra-ui/react';
import { theme } from '@/component/theme/theme';
import { SSRProvider } from 'react-aria';
import Layout from '@/component/layout/Layout';

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <SSRProvider>
        <ChakraProvider theme={theme}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ChakraProvider>
      </SSRProvider>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
