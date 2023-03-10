import { Flex } from '@chakra-ui/react';
import type { ReactElement } from 'react';
import Footer from './footer/Footer';
import Navbar from './navbar/Navbar';
import NavbarV2 from './navbar/NavbarV2';

const Layout = ({ children }: { children: ReactElement }) => {
  return (
    <>
      <Flex flexDirection="column" minH={'100vh'}>
        <NavbarV2 />
        {children}
        <Footer />
      </Flex>
    </>
  );
};

export default Layout;
