/* eslint-disable @typescript-eslint/no-misused-promises */
import { EmailIcon } from '@chakra-ui/icons';
import { ModalCloseButton } from '@chakra-ui/react';
import {
  Stack,
  Button,
  Image,
  Text,
  Icon,
  Modal,
  ModalContent,
  ModalOverlay,
} from '@chakra-ui/react';
import { atom, useAtom } from 'jotai';
import { signIn } from 'next-auth/react';
import { memo, useCallback, useState } from 'react';
import { MdEmail } from 'react-icons/md/index';
const loginModalAtom = atom(false);

export const useLoginModal = () => {
  const [isOpen, setOpen] = useAtom(loginModalAtom);
  const open = useCallback(() => setOpen(true), [setOpen]);
  const onClose = useCallback(() => setOpen(false), [setOpen]);
  return {
    isOpen,
    open,
    onClose,
  };
};

const useSignIn = () => {
  const [isLoading, setLoading] = useState(false);

  const handleSignIn = useCallback(
    async (method: 'facebook' | 'email' | 'google') => {
      setLoading(true);
      try {
        await signIn(method);
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
      }
      return;
    },
    []
  );

  return {
    handleSignIn,
    isLoading,
  };
};

const LoginModal = (): JSX.Element => {
  const [isOpen, setOpen] = useAtom(loginModalAtom);
  const onClose = useCallback(() => setOpen(false), []);
  const { handleSignIn, isLoading } = useSignIn();

  return (
    <Modal
      size={{
        base: 'full',
        md: 'md',
      }}
      isOpen={isOpen}
      onClose={onClose}
    >
      <ModalOverlay />

      <ModalContent
        py={{
          base: 0,
          md: 10,
        }}
        maxW="md"
      >
        <ModalCloseButton />
        <Stack justifyContent="center" alignItems="center" justify="center">
          <Image
            h="clamp(100px, 40vh, 280px)"
            src="/images/login.png"
            alt="logo"
          />
          <Text textAlign="center" fontSize="2xl" fontWeight="bold">
            Discovery your next hangout.
          </Text>
          <Text textAlign="center" fontSize="xl">
            Stray is here to help you find the best clubs and bars based on your
            interests.
          </Text>
          <Button
            onClick={() => handleSignIn('facebook')}
            isLoading={isLoading}
            justifyContent="flex-start"
            leftIcon={
              <Image width="24px" alt="facebook" src="/images/facebook.png" />
            }
            size="lg"
            width={240}
          >
            Login with Facebook
          </Button>
          <Button
            onClick={() => handleSignIn('google')}
            isLoading={isLoading}
            justifyContent="flex-start"
            leftIcon={
              <Image width="24px" alt="google" src="/images/google.png" />
            }
            size="lg"
            width={240}
          >
            Login with Google
          </Button>
          <Button
            onClick={() => handleSignIn('email')}
            isLoading={isLoading}
            justifyContent="flex-start"
            leftIcon={
              <Text width="24px" fontSize="2xl">
                @
              </Text>
            }
            size="lg"
            width={240}
          >
            Login with Email
          </Button>
        </Stack>
      </ModalContent>
    </Modal>
  );
};
const LoginModalMemo = memo(LoginModal);
export default LoginModalMemo;
