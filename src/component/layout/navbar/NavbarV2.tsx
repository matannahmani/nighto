import type { ReactNode } from 'react';
import { useEffect, useState } from 'react';
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
  Center,
  IconButton,
  HStack,
  Collapse,
  useBreakpointValue,
  SkeletonCircle,
} from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import { signOut, useSession } from 'next-auth/react';
import dynamic from 'next/dynamic';
import { useLoginModal } from '@/component/modals/login/LoginModal';
import type { Session } from 'next-auth';
import NextLink from 'next/link';
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
const NavLink = ({
  children,
  href,
  onClick,
}: {
  href: string;
  children: ReactNode;
  onClick?: () => void;
}) => (
  <Link
    as={NextLink}
    px={2}
    py={1}
    {...(onClick ? { onClick } : {})}
    rounded={'md'}
    _hover={{
      textDecoration: 'none',
      bg: useColorModeValue('gray.200', 'gray.700'),
    }}
    href={href}
  >
    {children}
  </Link>
);

const ProfileMenu = ({ session }: { session: Session }) => {
  const isMenuVisible = useNavbarScroll();
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Menu
      preventOverflow={true}
      isOpen={isOpen && isMenuVisible}
      onClose={onClose}
      onOpen={onOpen}
    >
      <MenuButton
        as={Button}
        isActive={isOpen && false}
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
            size={'lg'}
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
};

const ProfileOrLogin = () => {
  const { data: session, status } = useSession();
  if (status === 'loading') return <SkeletonCircle size="8" my="auto" />;
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

export const NavbarHeight = 16;
const IteneraryModal = dynamic(
  () => import('@/component/pages/Itenerary/IteneraryModal'),
  { ssr: false }
);

export default function NavbarV2() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { data: session } = useSession();
  const { onOpen: onItenaryOpen } = useItenaryModal();
  const isMD = useBreakpointValue({ base: false, md: true });
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
        bg={useColorModeValue('gray.100', 'gray.900')}
        px={4}
      >
        <Flex
          h={NavbarHeight}
          alignItems={'center'}
          justifyContent={'space-between'}
        >
          <IconButton
            size={'md'}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={'Open Menu'}
            display={{ md: 'none' }}
            onClick={isOpen ? onClose : onOpen}
          />

          <Box
            mx={{
              base: 'auto',
              md: 0,
            }}
          >
            <AppIcon
              fill={useColorModeValue('gray.800', 'white')}
              width={120}
              height={54}
            />
          </Box>
          <HStack
            display={{ base: 'none', md: 'flex' }}
            mr="auto"
            ml={6}
            spacing={8}
          >
            <HStack as={'nav'} spacing={4}>
              {Links.map((link) => {
                if (link.renderCondition?.(session) ?? true)
                  return (
                    <NavLink
                      key={link.label}
                      href={`${link.prefix?.(session) ?? ''}${link.href}`}
                    >
                      {link.label}
                    </NavLink>
                  );
              })}
            </HStack>
          </HStack>
          <Flex alignItems={'center'}>
            <Stack direction={'row'} spacing={7}>
              <Button
                onClick={onItenaryOpen}
                my="auto"
                leftIcon={<AddIcon />}
                size={{
                  base: 'xs',
                  sm: 'sm',
                }}
                variant="outline"
                colorScheme="purple"
              >
                Itenerary
              </Button>
              <Flex>
                <ProfileOrLogin />
              </Flex>
            </Stack>
          </Flex>
        </Flex>
        <Collapse in={isOpen} animateOpacity>
          <Box pb={4} display={{ md: 'none' }}>
            <Stack as={'nav'} spacing={4}>
              {Links.map((link) => {
                if (link.renderCondition?.(session) ?? true)
                  return (
                    <NavLink
                      onClick={onClose}
                      href={`${link.prefix?.(session) ?? ''}${link.href}`}
                      key={link.label}
                    >
                      {link.label}
                    </NavLink>
                  );
              })}
              {/* <Button w="min-content" onClick={toggleColorMode}>
                {colorMode === 'light' ? 'Dark' : 'Light'}
                &nbsp;&nbsp;
                {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
              </Button> */}
            </Stack>
          </Box>
        </Collapse>
      </Box>
      <IteneraryModal />
    </>
  );
}

import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import { MdHome, MdSearch } from 'react-icons/md';
import { getDiscovery } from '@/component/pages/discover/atom';
import useItenaryModal from '@/component/pages/Itenerary/IteneraryModal/useItenaryModal';

type Link = {
  label: string;
  href: string;
  prefix?: (session: Session | null) => string;
  icon?: React.ReactNode;
  renderCondition?: (session: Session | null) => boolean;
};

const Links: readonly Link[] = [
  {
    label: 'Home',
    href: '/',
    icon: <MdHome />,
  },
  {
    label: 'Discover',
    prefix: (session) => {
      const { country, city } = getDiscovery();
      return `/${country}/${city}`.toLowerCase();
    },
    href: '/discover',
    icon: <MdSearch />,
  },
  {
    label: 'Night Clubs',
    href: '/clubs',
  },
  {
    label: 'Bars',
    href: '/bars',
  },
  {
    label: 'Events',
    href: '/events',
  },
  {
    label: 'Managment Dashboard',
    href: '/dashboard',
    renderCondition: (session) => session?.user?.role === 'ADMIN',
  },
] as const;
