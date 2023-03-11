import DiscoverDate from '@/component/pages/discover/DiscoverDate';
import DiscoverLocation from '@/component/pages/discover/DiscoverLocation';
import { Container, VStack } from '@chakra-ui/react';
import type { NextPage } from 'next';

const DiscoverPage: NextPage = () => {
  return (
    <>
      <Container mr="auto" ml={2} maxW="container.xl">
        <DiscoverDate />
        <DiscoverLocation />
        <VStack spacing={4}></VStack>
      </Container>
    </>
  );
};

export default DiscoverPage;
