import { Avatar, Button } from '@chakra-ui/react';
import { useSession } from 'next-auth/react';
import Profile from '../shared/Profile';

const MobileNavbar = () => {
  return (
    <>
      <Profile />
    </>
  );
};

export default MobileNavbar;
