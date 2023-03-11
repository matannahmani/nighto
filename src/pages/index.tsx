import LandingHero from '@/component/pages/landing/Hero';
import { Container } from '@chakra-ui/react';

import type { NextPage } from 'next';

const Home: NextPage = () => {
  return (
    <Container mx="auto" maxW="container.lg">
      <LandingHero />
    </Container>
  );
};

export default Home;
