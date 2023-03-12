/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { prisma } from '@/server/db';
import { z } from 'zod';

import { createTRPCRouter, publicProcedure } from '../../trpc';

const retreiveZod = z
  .object({
    country: z.string().min(0).max(3),
    city: z.string().min(0).max(128),
    genre: z.string().optional(),
  })
  .optional();

/**
 * This is event router for public API
 */
export const discoverRouter = createTRPCRouter({
  retreive: publicProcedure.input(retreiveZod).query(async ({ input }) => {
    const venues = await prisma.venue.findMany({
      ...(input && {
        where: {
          city: input.city,
          country: input.country,
        },
      }),
      take: 25,
      orderBy: {
        rating: 'desc',
      },
    });
    return venues;
  }),
});
