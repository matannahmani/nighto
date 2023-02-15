import { HStack, Avatar, Text } from '@chakra-ui/react';
import NavbarNotifications from './NavbarNotifications';
import NavbarPopover from './NavbarPopover';

const Navbar = () => {
  return (
    <HStack px={4} py={2} spacing={2}>
      <Avatar name="Dan Abrahmov" src="https://bit.ly/dan-abramov" />
      <NavbarPopover />
      <NavbarNotifications />
    </HStack>
  );
};
export default Navbar;
