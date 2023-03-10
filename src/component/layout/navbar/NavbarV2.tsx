import type { ReactNode } from 'react';
import {
  Box,
  Flex,
  Avatar,
  Link,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
  useColorMode,
  Center,
} from '@chakra-ui/react';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import { useSession } from 'next-auth/react';
import dynamic from 'next/dynamic';
import { useLoginModal } from '@/component/modals/login/LoginModal';
import { Session } from 'next-auth';

const LoginModal = dynamic(() => import('@/component/modals/login/LoginModal'));

const LoginBTN = () => {
  const { data: session, status } = useSession();
  const { open } = useLoginModal();
  if (!session)
    return (
      <>
        <Button onClick={open}>Login</Button>
        <LoginModal />
      </>
    );
  return null;
};
const NavLink = ({ children }: { children: ReactNode }) => (
  <Link
    px={2}
    py={1}
    rounded={'md'}
    _hover={{
      textDecoration: 'none',
      bg: useColorModeValue('gray.200', 'gray.700'),
    }}
    href={'#'}
  >
    {children}
  </Link>
);

const ProfileMenu = ({ session }: { session: Session }) => (
  <Menu>
    <MenuButton
      as={Button}
      rounded={'full'}
      variant={'link'}
      cursor={'pointer'}
      minW={0}
    >
      <Avatar
        size={'sm'}
        src={
          session.user.image ??
          'https://avatars.dicebear.com/api/male/username.svg'
        }
      />
    </MenuButton>
    <MenuList alignItems={'center'}>
      <br />
      <Center>
        <Avatar
          size={'2xl'}
          src={
            session.user.image ??
            'https://avatars.dicebear.com/api/male/username.svg'
          }
        />
      </Center>
      <br />
      <Center>
        <p>{session.user.name}</p>
      </Center>
      <br />
      <MenuDivider />
      <MenuItem>Your Preference</MenuItem>
      <MenuItem>Past Explorations</MenuItem>
      <MenuItem>Account Settings</MenuItem>
      <MenuItem>Logout</MenuItem>
    </MenuList>
  </Menu>
);

const ProfileOrLogin = () => {
  const { data: session, status } = useSession();
  if (!session) return <LoginBTN />;
  return <ProfileMenu session={session} />;
};

export default function NavbarV2() {
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <Box>Nighto</Box>

          <Flex alignItems={'center'}>
            <Stack direction={'row'} spacing={7}>
              <Button onClick={toggleColorMode}>
                {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
              </Button>
              <ProfileOrLogin />
            </Stack>
          </Flex>
        </Flex>
      </Box>
    </>
  );
}
