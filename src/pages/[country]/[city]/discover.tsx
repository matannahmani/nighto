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
import { api } from '@/utils/api';
import DiscoverPageLayout from '@/component/pages/discover/DiscoverPageLayout';
import { Text } from '@chakra-ui/react';

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
  if (isLoading)
    return (
      <DiscoverPageLayout>
        <Text>Loading...</Text>
      </DiscoverPageLayout>
    );
  if (!data)
    return (
      <DiscoverPageLayout>
        <Text>Not Found</Text>
      </DiscoverPageLayout>
    );
  return (
    <DiscoverPageLayout>
      <>{JSON.stringify(data, null, 2)}</>
    </DiscoverPageLayout>
  );
}

export async function getStaticProps(
  context: GetStaticPropsContext<{ country: string; city: string }>
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
