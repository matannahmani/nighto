import { HStack, Avatar, Text } from '@chakra-ui/react';
import ColorModeToggle from './ColorModeToggle';
import NavbarNotifications from './NavbarNotifications';
import NavbarPopover from './NavbarPopover';

const Navbar = () => {
  return (
    <HStack py={2} width="100%" spacing={2}>
      <Avatar name="Dan Abrahmov" src="https://bit.ly/dan-abramov" />
      <NavbarPopover />
      <ColorModeToggle />
      <NavbarNotifications />
    </HStack>
  );
};
export default Navbar;
