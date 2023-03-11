import { ReactNode, useEffect, useState } from 'react';
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
  IconButton,
  HStack,
  Collapse,
} from '@chakra-ui/react';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import { signOut, useSession } from 'next-auth/react';
import dynamic from 'next/dynamic';
import { useLoginModal } from '@/component/modals/login/LoginModal';
import { Session } from 'next-auth';
import Image from 'next/image';
import AppIcon from './AppIcon';

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
        <p>{session.user.name ?? session.user.email}</p>
      </Center>
      <br />
      <MenuDivider />
      <MenuItem>Your Preference</MenuItem>
      <MenuItem>Past Explorations</MenuItem>
      <MenuItem>Account Settings</MenuItem>
      <MenuItem
        onClick={() => {
          void signOut();
        }}
      >
        Logout
      </MenuItem>
    </MenuList>
  </Menu>
);

const ProfileOrLogin = () => {
  const { data: session, status } = useSession();
  if (!session) return <LoginBTN />;
  return <ProfileMenu session={session} />;
};

const useNavbarScroll = () => {
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);

  const handleScroll = () => {
    const currentScrollPos = window.scrollY;

    if (currentScrollPos > prevScrollPos) {
      setVisible(false);
    } else {
      setVisible(true);
    }

    setPrevScrollPos(currentScrollPos);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  });
  return visible;
};

export default function NavbarV2() {
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const visible = useNavbarScroll();

  return (
    <>
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          transition: 'all 0.3s ease-in-out',
          transform: visible ? 'translateY(0)' : 'translateY(-100%)',
          zIndex: 100,
          width: '100%',
        }}
      >
        <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
          <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
            <IconButton
              size={'md'}
              icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
              aria-label={'Open Menu'}
              display={{ md: 'none' }}
              onClick={isOpen ? onClose : onOpen}
            />

            <Box>
              <AppIcon
                fill={useColorModeValue('gray.800', 'white')}
                width={120}
                height={54}
              />
            </Box>
            <HStack spacing={8}>
              <HStack
                as={'nav'}
                spacing={4}
                display={{ base: 'none', md: 'flex' }}
              >
                {Links.map((link) => (
                  <NavLink key={link}>{link}</NavLink>
                ))}
              </HStack>
            </HStack>
            <Flex alignItems={'center'}>
              <Stack direction={'row'} spacing={7}>
                <Button
                  display={{ base: 'none', md: 'flex' }}
                  onClick={toggleColorMode}
                >
                  {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
                </Button>
                <ProfileOrLogin />
              </Stack>
            </Flex>
          </Flex>
          <Collapse in={isOpen} animateOpacity>
            <Box pb={4} display={{ md: 'none' }}>
              <Stack as={'nav'} spacing={4}>
                {Links.map((link) => (
                  <NavLink key={link}>{link}</NavLink>
                ))}
                <Button w="min-content" onClick={toggleColorMode}>
                  {colorMode === 'light' ? 'Dark' : 'Light'}
                  &nbsp;&nbsp;
                  {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
                </Button>
              </Stack>
            </Box>
          </Collapse>
        </Box>
      </Box>
    </>
  );
}

import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import { useAutoAnimate } from '@formkit/auto-animate/react';

const Links = ['Dashboard', 'Projects', 'Team'];
