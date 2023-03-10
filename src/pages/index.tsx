import LandingHero from '@/component/pages/landing/Hero';
import { Button, Container, VStack } from '@chakra-ui/react';

import type { NextPage } from 'next';

const Home: NextPage = () => {
  return (
    <Container maxW="container.lg">
      <LandingHero />
    </Container>
  );
};

export default Home;
