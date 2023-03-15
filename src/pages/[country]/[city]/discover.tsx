/* eslint-disable @typescript-eslint/await-thenable */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { appRouter } from '@/server/api/root';
import { createProxySSGHelpers } from '@trpc/react-query/ssg';
import { prisma } from '@/server/db';
import type {
  GetStaticPaths,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from 'next/types';
import SuperJSON from 'superjson';
import { api } from '@/utils/api';
import DiscoverPageLayout from '@/component/pages/discover/DiscoverPageLayout';
import { Text } from '@chakra-ui/react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { DiscoverSection } from '../../../component/pages/discover/DiscoverSection';

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
          key="near"
          title={`Near ${city ?? ''}, ${country ?? ''}`}
          data={data?.nearest}
          isLoading={isLoading}
        />
        <DiscoverSection
          href="./event"
          key="event-upcoming"
          title={`Upcoming Events`}
          data={data?.events}
          isLoading={isLoading}
        />
        <DiscoverSection
          href="./venue"
          key="popular-club"
          title="Popular Clubs"
          data={data?.clubs}
          isLoading={isLoading}
        />
        <DiscoverSection
          href="./bar"
          key="popular-bar"
          title="Popular Bars and Pubs"
          data={data?.bars}
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
