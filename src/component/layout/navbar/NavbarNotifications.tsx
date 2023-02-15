import { IconButton } from '@chakra-ui/react';
import { FaBell } from 'react-icons/fa';

const NavbarNotifications = () => {
  return (
    <IconButton
      variant="ghost"
      ml="auto!important"
      //   colorScheme="teal"
      aria-label="Notifications"
      icon={<FaBell />}
    />
  );
};

export default NavbarNotifications;
