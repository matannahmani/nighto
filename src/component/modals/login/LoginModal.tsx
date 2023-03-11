/* eslint-disable @typescript-eslint/no-misused-promises */
import { EmailIcon, PhoneIcon } from '@chakra-ui/icons';
import {
  Flex,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  ModalCloseButton,
  Spinner,
} from '@chakra-ui/react';
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
import { memo, useCallback, useMemo, useState } from 'react';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import { MdSend } from 'react-icons/md';
import { z } from 'zod';
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
    async (method: 'facebook' | 'email' | 'google', email?: string) => {
      setLoading(true);
      try {
        if (method === 'email' && email) {
          await signIn('email', {
            email,
          });
        } else await signIn(method);
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

const emailZod = z.string().email();
const LoginEmail = ({ ...props }: ReturnType<typeof useSignIn>) => {
  const [parent] = useAutoAnimate();
  const [isToggled, setToggled] = useState(false);
  const [email, setEmail] = useState('');
  const isEmailValid = useMemo(() => {
    return emailZod.safeParse(email).success;
  }, [email]);
  return (
    <Flex ref={parent}>
      {!isToggled && (
        <Button
          onClick={() => setToggled(true)}
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
      )}
      {isToggled && (
        <InputGroup>
          <InputRightElement>
            <IconButton
              variant="link"
              cursor="pointer"
              isLoading={props.isLoading}
              isDisabled={!isEmailValid}
              onClick={() => props.handleSignIn('email', email)}
              size="xs"
              icon={<MdSend />}
              color="gray.300"
              aria-label={'send-email-link'}
            />
          </InputRightElement>
          <Input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            isRequired
            borderColor={isEmailValid ? 'green.400' : ''}
            focusBorderColor={isEmailValid ? 'green.400' : ''}
            isInvalid={!isEmailValid}
            errorBorderColor="red.300"
            type="email"
            placeholder="Email"
          />
        </InputGroup>
      )}
    </Flex>
  );
};

const LoginModal = (): JSX.Element => {
  const [isOpen, setOpen] = useAtom(loginModalAtom);
  const onClose = useCallback(() => setOpen(false), []);
  const login = useSignIn();
  const { handleSignIn, isLoading } = login;
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
          <LoginEmail {...login} />
        </Stack>
      </ModalContent>
    </Modal>
  );
};
const LoginModalMemo = memo(LoginModal);
export default LoginModalMemo;
