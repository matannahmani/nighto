import { Button, Image, Stack, Text } from '@chakra-ui/react';
import type { NextPage } from 'next';
import { Container } from '@chakra-ui/react';
const LoginPage: NextPage = () => {
  return (
    <>
      <Container maxW="sm">
        <Stack justifyContent="center" alignItems="center" justify="center">
          <Image
            h="clamp(100px, 40vh, 280px)"
            src="/images/login.png"
            alt="logo"
          />
          <Text textAlign="center" fontSize="2xl" fontWeight="bold">
            Discovery your next hangout.
          </Text>
          <Text textAlign="center" color="gray" fontSize="xl">
            Stray is here to help you find the best clubs and bars based on your
            interests.
          </Text>
          <Button
            justifyContent="flex-start"
            leftIcon={<Image alt="facebook" src="/images/facebook.png" />}
            size="lg"
            width={240}
          >
            Login with Facebook
          </Button>
          <Button
            justifyContent="flex-start"
            leftIcon={<Image alt="google" src="/images/google.png" />}
            size="lg"
            width={240}
          >
            Login with Google
          </Button>
          <Button
            justifyContent="flex-start"
            leftIcon={<Image alt="instagram" src="/images/instagram.png" />}
            size="lg"
            width={240}
          >
            Login with Instagram
          </Button>
        </Stack>
      </Container>
    </>
  );
};

export default LoginPage;
