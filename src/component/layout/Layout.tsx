import { Box, Flex } from '@chakra-ui/react';
import type { ReactElement } from 'react';
import Footer from './footer/Footer';
import NavbarV2, { NavbarHeight } from './navbar/NavbarV2';
import { chakra } from '@chakra-ui/react';
import { motion, isValidMotionProp, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/router';

const Layout = ({ children }: { children: ReactElement }) => {
  const router = useRouter();
  return (
    <>
      <Flex overflowX={'hidden'} flexDirection="column" minH={'100vh'}>
        <NavbarV2 />
        <AnimatePresence
          mode="wait"
          initial={false}
          onExitComplete={() => window?.scrollTo(0, 0)}
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            key={router.pathname}
            transition={{
              type: 'spring',
              stiffness: 260,
              damping: 20,
            }}
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

        <Footer />
      </Flex>
    </>
  );
};

export default Layout;
