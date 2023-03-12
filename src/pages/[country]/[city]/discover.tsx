/* eslint-disable @typescript-eslint/await-thenable */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { appRouter } from '@/server/api/root';
import { createProxySSGHelpers } from '@trpc/react-query/ssg';
import { prisma } from '@/server/db';
import type {
  GetStaticPaths,
  GetStaticProps,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from 'next/types';
import SuperJSON from 'superjson';
import type { RouterOutputs } from '@/utils/api';
import { api } from '@/utils/api';
import NextLink from 'next/link';
import DiscoverPageLayout from '@/component/pages/discover/DiscoverPageLayout';
import {
  AspectRatio,
  Box,
  Flex,
  HStack,
  Image,
  Link,
  LinkBox,
  LinkOverlay,
  Skeleton,
  SkeletonText,
  Tag,
  TagLabel,
  TagLeftIcon,
  Text,
  VStack,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import Scrollbars from 'rc-scrollbars';
import {
  FaClock,
  FaCocktail,
  FaMusic,
  FaStar,
  FaTicketAlt,
} from 'react-icons/fa';

type data = RouterOutputs['discover']['retreive']['nearest'][number];

export function DiscoverCard(props: data) {
  const router = useRouter();
  return (
    <NextLink
      href={{
        pathname: './venue/[id]',
        query: { ...router.query, id: props.id },
      }}
    >
      <LinkOverlay as="span">
        <VStack
          spacing={2}
          overflow="hidden"
          whiteSpace="nowrap"
          w="327px"
          alignItems="flex-start"
          textAlign="start"
        >
          <Box position="relative" w="100%" h={'auto'}>
            <Image
              src={props.photo}
              w="100%"
              h="218px"
              borderRadius="2xl"
              // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
              alt={`Photo of ${props.name} in ${props.city}, ${props.country}`}
              objectFit="cover"
            />
            <Tag
              position="absolute"
              zIndex="3"
              bottom="2"
              left="2"
              size="md"
              w="min-content"
              h="min-content"
              variant="subtle"
              colorScheme="black"
            >
              <TagLeftIcon boxSize="12px" as={FaClock} />
              <TagLabel>
                {props.openTime} ~ {props.closeTime}
              </TagLabel>
            </Tag>
          </Box>
          <Text fontWeight="bold">{props.name}</Text>
          <Text
            textOverflow="ellipsis"
            overflow="hidden"
            maxWidth="100%"
            color="gray.500"
            fontSize="md"
          >
            {props.address}
          </Text>
          <HStack spacing={2}>
            {props.venueGenre[0] && (
              <Tag size="md" variant="subtle" colorScheme="cyan">
                <TagLeftIcon boxSize="12px" as={FaMusic} />
                <TagLabel>{props.venueGenre[0]?.genre.mainGenre}</TagLabel>
              </Tag>
            )}
            {props.rating && (
              <Tag size="md" variant="subtle" colorScheme="orange">
                <TagLeftIcon boxSize="12px" as={FaStar} />
                <TagLabel>{props.rating}</TagLabel>
              </Tag>
            )}
            {props.averageEntryFee && (
              <Tag size="md" variant="subtle" colorScheme="red">
                <TagLeftIcon boxSize="12px" as={FaTicketAlt} />
                <TagLabel>{props.averageEntryFee.toFixed(2)} $</TagLabel>
              </Tag>
            )}
            {props.averageDrinkPrice && (
              <Tag size="md" variant="subtle" colorScheme="fuschia">
                <TagLeftIcon boxSize="12px" as={FaCocktail} />
                <TagLabel>{props.averageDrinkPrice.toFixed(2)} $</TagLabel>
              </Tag>
            )}
          </HStack>
        </VStack>
      </LinkOverlay>
    </NextLink>
  );
}

export function DiscordCardSkeleton() {
  return (
    <VStack spacing={2} alignItems="flex-start" overflow="hidden">
      <Skeleton borderRadius={'xl'} height="218px" width="327px" />
      <SkeletonText width={20} noOfLines={1} skeletonHeight={4} />
      <SkeletonText width="80%" noOfLines={1} skeletonHeight={4} />
      <SkeletonText width="80%" skeletonHeight={2} noOfLines={1} />
    </VStack>
  );
}

type DiscoverSectionT = {
  title: string;
  isLoading: boolean;
  href: string;
  catid: string;
  data: data[] | undefined;
};

function DiscoverSection({
  title,
  data,
  isLoading,
  href,
  catid,
}: DiscoverSectionT) {
  const router = useRouter();
  return (
    <Flex
      key={title + 'cat'}
      w="100%"
      my={4}
      direction="column"
      alignItems="flex-start"
    >
      <HStack
        w={{
          base: '100%',
          sm: '320px',
        }}
      >
        <Text textTransform="capitalize" fontSize="xl" fontWeight="bold">
          {title}
        </Text>
        <Link
          ml="auto!important"
          mr="2!important"
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          href={{
            pathname: href,
            query: router.query,
          }}
          as={NextLink}
        >
          <Text color="purple.400" fontSize="sm">
            See all
          </Text>
        </Link>
      </HStack>
      <Scrollbars autoHide style={{ height: 340, width: '100%' }}>
        <HStack spacing={4} mt={6}>
          {isLoading ? (
            <>
              <DiscordCardSkeleton />
              <DiscordCardSkeleton />
              <DiscordCardSkeleton />
              <DiscordCardSkeleton />
            </>
          ) : (
            data?.map((venue, index) => (
              <DiscoverCard {...venue} key={`${title}-${index}`} />
            ))
          )}
        </HStack>
      </Scrollbars>
    </Flex>
  );
}

export default function DiscoverPage(
  props: InferGetStaticPropsType<typeof getStaticProps>
) {
  const { country, city } = props;
  const { isLoading, data } = api.discover.retreive.useQuery(
    country && city ? { country, city } : undefined,
    {
      staleTime: 1000 * 60 * 5,
    }
  );
  if (!data && !isLoading)
    return (
      <DiscoverPageLayout>
        <Text>Not Found</Text>
      </DiscoverPageLayout>
    );
  return (
    <DiscoverPageLayout>
      <>
        <DiscoverSection
          href="./discover"
          catid="near-seoul"
          key="near"
          title={`Near ${city ?? ''}, ${country ?? ''}`}
          data={data?.nearest}
          isLoading={isLoading}
        />
        <DiscoverSection
          href="./venue"
          catid="club-popular-seoul"
          key="popular"
          title="Popular Clubs"
          data={data?.clubs}
          isLoading={isLoading}
        />
      </>
    </DiscoverPageLayout>
  );
}

export async function getStaticProps(
  context: GetStaticPropsContext<{ country: string; city: string }>
) {
  const ssg = await createProxySSGHelpers({
    router: appRouter,
    ctx: {
      session: null,
      prisma: prisma,
    },
    transformer: SuperJSON, // optional - adds superjson serialization
  });
  // prefetch `post.byId`
  await ssg.discover.retreive.prefetch(context?.params);
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
      country: true,
      city: true,
    },
    take: 1000,
  });
  return {
    paths: venues.map((venue) => ({
      params: {
        country: venue.country,
        city: venue.city,
      },
    })),
    // https://nextjs.org/docs/api-reference/data-fetching/get-static-paths#fallback-blocking
    fallback: true,
  };
};
