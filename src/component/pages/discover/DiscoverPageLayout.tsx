import { Container, VStack } from '@chakra-ui/react';
import type { ReactElement } from 'react';
import DiscoverDate from './DiscoverDate';
import DiscoverLocation from './DiscoverLocation';

const DiscoverPageLayout = ({ children }: { children: ReactElement }) => {
  return (
    <Container mr="auto" ml={2} maxW="container.xl">
      <DiscoverDate />
      <DiscoverLocation />
      <VStack spacing={4}>{children}</VStack>
    </Container>
  );
};

export default DiscoverPageLayout;
