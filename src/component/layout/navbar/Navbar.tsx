import { useBreakpointValue } from '@chakra-ui/react';
import DesktopNavbar from './desktop/DesktopNavbar';
import MobileNavbar from './mobile/MobileNavbar';

/**
 * Navbar component
 * dynamicaly render navbar based on screen size (mobile or desktop)
 */
const Navbar = () => {
  const isMobile = useBreakpointValue({ base: true, md: false });

  return isMobile ? <MobileNavbar /> : <DesktopNavbar />;
};

export default Navbar;
