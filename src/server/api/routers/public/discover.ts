/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { prisma } from '@/server/db';
import { z } from 'zod';

import { createTRPCRouter, publicProcedure } from '../../trpc';

const retreiveZod = z
  .object({
    country: z.string().min(0).max(64),
    city: z.string().min(0).max(128),
    genre: z.string().optional(),
  })
  .optional();

/**
 * This is event router for public API
 */
export const discoverRouter = createTRPCRouter({
  retreive: publicProcedure.input(retreiveZod).query(async ({ input }) => {
    const toppestRatedBarsPromise = prisma.venue.findMany({
      ...(input && {
        where: {
          city: input.city,
          country: input.country,
          type: {
            in: ['BAR', 'PUB', 'LOUNGE'],
          },
        },
      }),
      take: 10,
      orderBy: {
        rating: 'desc',
      },
      include: {
        venueGenre: {
          include: {
            genre: true,
          },
        },
      },
    });
    const toppestRatedClubsPromise = prisma.venue.findMany({
      ...(input && {
        where: {
          city: input.city,
          country: input.country,
          type: {
            in: ['NIGHTCLUB', 'RAVE'],
          },
        },
      }),
      take: 10,
      orderBy: {
        rating: 'desc',
      },
      include: {
        venueGenre: {
          include: {
            genre: true,
          },
        },
      },
    });
    const [toppestRatedBars, toppestRatedClubs] = await Promise.all([
      toppestRatedBarsPromise,
      toppestRatedClubsPromise,
    ]);
    const nearest = [...toppestRatedBars, ...toppestRatedClubs].sort(
      (a, b) => a.rating - b.rating
    );
    return {
      nearest: nearest,
      bars: toppestRatedBars,
      clubs: toppestRatedClubs,
    };
  }),
});
