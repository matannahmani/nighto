import { Flex, useBreakpointValue } from '@chakra-ui/react';
import type { ReactElement } from 'react';
import Footer from './footer/Footer';
import NavbarV2, { NavbarHeight } from './navbar/NavbarV2';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/router';

const AnimatePhone = ({ children }: { children: ReactElement }) => {
  const isMobile = useBreakpointValue({ base: true, sm: false });
  const router = useRouter();
  if (!isMobile) return children;
  return (
    <AnimatePresence
      exitBeforeEnter
      initial={false}
      onExitComplete={() => window?.scrollTo(0, 0)}
    >
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 40 }}
        key={router.pathname}
        transition={{ duration: 0.1, ease: 'easeInOut' }}
        style={{
          flex: 1,
          marginTop: NavbarHeight * 4,
          paddingTop: 8,
          paddingBottom: 8,
        }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

const Layout = ({ children }: { children: ReactElement }) => {
  return (
    <>
      <Flex overflowX={'hidden'} flexDirection="column" minH={'100vh'}>
        <NavbarV2 />
        <AnimatePhone>{children}</AnimatePhone>

        <Footer />
      </Flex>
    </>
  );
};

export default Layout;
