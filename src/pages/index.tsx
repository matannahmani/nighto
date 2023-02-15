import EventFinderInput from '@/component/autocomplete/EventFinder';
import Navbar from '@/component/layout/navbar';
import HomeCategories from '@/component/pages/home/HomeCategories';
import { Input, VStack } from '@chakra-ui/react';

import type { NextPage } from 'next';

const Home: NextPage = () => {
  return (
    <VStack px={4} alignItems="normal" spacing={2}>
      <Navbar />
      <EventFinderInput />
      <HomeCategories />
    </VStack>
  );
};

export default Home;
