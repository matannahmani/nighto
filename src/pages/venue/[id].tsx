import { prisma } from '@/server/db';
import {
  Box,
  Container,
  Stack,
  Text,
  Image,
  Flex,
  VStack,
  Button,
  Heading,
  SimpleGrid,
  StackDivider,
  useColorModeValue,
  VisuallyHidden,
  Icon,
  List,
  ListItem,
  SkeletonCircle,
  SkeletonText,
  Skeleton,
} from '@chakra-ui/react';
import { createProxySSGHelpers } from '@trpc/react-query/ssg';
import { appRouter } from '@/server/api/root';

import type {
  InferGetStaticPropsType,
  GetStaticPropsContext,
  GetStaticPaths,
} from 'next';
import { FaBeer, FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';
import { MdLocalShipping } from 'react-icons/md';
import SuperJSON from 'superjson';
import { api } from '@/utils/api';
import { DiscoverSection } from '@/component/pages/discover/DiscoverSection';

export default function VenuePage(
  props: InferGetStaticPropsType<typeof getStaticProps>
) {
  const { id } = props;

  const { isLoading, data } = api.discover.venueById.useQuery(
    Number(id) ?? -1,
    {
      staleTime: 1000 * 60 * 5,
    }
  );
  if (data)
    return (
      <Container maxW={'7xl'}>
        <SimpleGrid
          columns={{ base: 1, lg: 2 }}
          spacing={{ base: 8, md: 10 }}
          py={{ base: 4, md: 8 }}
        >
          <Flex>
            <Image
              rounded={'md'}
              alt={'product image'}
              src={data?.photo}
              fit={'cover'}
              align={'center'}
              w={'100%'}
              h={{ base: '100%', sm: '400px', lg: '500px' }}
            />
          </Flex>
          <Stack spacing={{ base: 6, md: 10 }}>
            <Box as={'header'}>
              <Heading
                lineHeight={1.1}
                fontWeight={600}
                fontSize={{ base: '2xl', sm: '4xl', lg: '5xl' }}
              >
                {data?.name}
              </Heading>
              <Text color={'gray.400'} fontWeight={300} mt={2} fontSize={'lg'}>
                {data?.address}
              </Text>
            </Box>

            <Stack
              spacing={{ base: 4, sm: 6 }}
              mt="4px!important"
              direction={'column'}
              divider={<StackDivider borderColor={'gray.600'} />}
            >
              <VStack spacing={{ base: 4, sm: 6 }}>
                <Text color={'gray.400'} fontSize={'md'} fontWeight={'300'}>
                  Enter a futuristic sonic sanctuary in the heart of Seoul.
                  Immerse yourself in cutting-edge beats, vibrant lighting, and
                  flawless sound, curated by renowned DJs. Experience the
                  convergence of technology and music at {data?.name}, where the
                  pulse of techno reigns supreme.
                </Text>
              </VStack>
              <Box>
                <Text
                  fontSize={{ base: '16px', lg: '18px' }}
                  color={'purple.400'}
                  fontWeight={'500'}
                  textTransform={'uppercase'}
                  mb={'4'}
                >
                  Venue Genres
                </Text>

                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
                  <List spacing={2}>
                    {data?.venueGenre?.slice(0, 2).map((genre) => (
                      <ListItem key={`venure-genre-${genre.id}`}>
                        {genre.genre.mainGenre}
                      </ListItem>
                    ))}
                  </List>
                  <List
                    display={
                      (data?.venueGenre?.length ?? -1) > 3 ? 'block' : 'none'
                    }
                    spacing={2}
                  >
                    {data?.venueGenre?.slice(2, 5).map((genre) => (
                      <ListItem key={`venure-genre-${genre.id}`}>
                        {genre.genre.mainGenre}
                      </ListItem>
                    ))}
                  </List>
                </SimpleGrid>
              </Box>
              <Box>
                <Text
                  fontSize={{ base: '16px', lg: '18px' }}
                  color={'purple.400'}
                  fontWeight={'500'}
                  textTransform={'uppercase'}
                  mb={'4'}
                >
                  Venue Details
                </Text>

                <List spacing={2}>
                  {data?.rating && (
                    <ListItem display="flex" alignItems="center">
                      <Text as={'span'}>Rating : {data?.rating} / 5</Text>
                    </ListItem>
                  )}
                  {data?.averageEntryFee && (
                    <ListItem display="flex" alignItems="center">
                      <Text as={'span'}>
                        Average Entry Price : {data?.averageEntryFee}$
                      </Text>
                    </ListItem>
                  )}

                  {data?.capacity && (
                    <ListItem>
                      <Text as={'span'} fontWeight={'bold'}>
                        Capacity:
                      </Text>{' '}
                      {data?.capacity}
                    </ListItem>
                  )}
                  {data?.averageDrinkPrice && (
                    <ListItem display="flex" alignItems="center">
                      <Text as={'span'}>
                        Average Drink Price : {data?.averageDrinkPrice}$
                      </Text>
                    </ListItem>
                  )}

                  {data?.averageBeerPrice && (
                    <ListItem display="flex" alignItems="center">
                      <Text as={'span'}>
                        Average Beer Price : {data?.averageBeerPrice}$
                      </Text>
                    </ListItem>
                  )}
                  {data?.averageCocktailPrice && (
                    <ListItem display="flex" alignItems="center">
                      <Text as={'span'}>
                        Average Cocktail Price : {data?.averageCocktailPrice}$
                      </Text>
                    </ListItem>
                  )}
                </List>
              </Box>
              <DiscoverSection
                title={'UPCOMING EVENTS'}
                href="./event"
                disableSeeAll
                disableMargin
                titleColor={'purple.400'}
                data={data?.events ?? []}
                isLoading={false}
              />
            </Stack>
          </Stack>
        </SimpleGrid>
      </Container>
    );
  if (!data && !isLoading) {
    return (
      <Box padding="6">
        <Skeleton h={200} w={200} />
        <SkeletonText
          mt="4"
          w={160}
          noOfLines={1}
          spacing="4"
          skeletonHeight="3"
        />

        <SkeletonText mt="4" noOfLines={4} spacing="4" skeletonHeight="2" />
      </Box>
    );
  }
  return <Box>Not found</Box>;
}

export async function getStaticProps(
  context: GetStaticPropsContext<{ id: string }>
) {
  const ssg = createProxySSGHelpers({
    router: appRouter,
    ctx: {
      session: null,
      prisma: prisma,
    },
    transformer: SuperJSON, // optional - adds superjson serialization
  });
  // prefetch `post.byId`
  await ssg.discover.venueById.prefetch(Number(context.params?.id) ?? -1);
  return {
    props: {
      trpcState: ssg.dehydrate(),
      ...context.params,
    },
    // revalidate: every 5 minutes
    revalidate: 60 * 5,
  };
}

export const getStaticPaths: GetStaticPaths = async () => {
  const venues = await prisma.venue.findMany({
    select: {
      id: true,
    },
    take: 1000,
  });
  return {
    paths: venues.map((venue) => ({
      params: {
        id: venue.id.toString(),
      },
    })),
    // https://nextjs.org/docs/api-reference/data-fetching/get-static-paths#fallback-blocking
    fallback: true,
  };
};
