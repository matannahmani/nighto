/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { prisma } from '@/server/db';
import { mainMusicGenre, Prisma, VenueType } from '@prisma/client';
import { number, promise, z } from 'zod';

import { createTRPCRouter, publicProcedure } from '../../trpc';

const retreiveZod = z
  .object({
    country: z.string().min(0).max(64),
    city: z.string().min(0).max(128),
    genre: z.string().optional(),
  })
  .optional();

const byPromptZod = z.object({
  genre: z.nativeEnum(mainMusicGenre).array(),
  city: z.string(),
  maxEntryPrice: z
    .literal(10)
    .or(z.literal(20))
    .or(z.literal(30))
    .or(z.literal(50))
    .or(z.literal(9999)),
  maxDrinkPrice: z
    .literal(10)
    .or(z.literal(20))
    .or(z.literal(30))
    .or(z.literal(9999)),
  maxDistance: z
    .literal(1)
    .or(z.literal(3))
    .or(z.literal(5))
    .or(z.literal(7))
    .or(z.literal(25))
    .or(z.literal(50)),
});

type mainMusicGenreString = keyof typeof mainMusicGenre;

function resultToPromptText(data: getPromptResult[][]) {
  const genreMap = new Map<mainMusicGenreString, number>();
  const typeMap = new Map<VenueType, number>();
  /**
   * ratingMap is used to calculate rating of each venue
   * key is venue id
   * value is rating
   */
  const ratingMap = new Map<number, number>();
  /**
   * distanceMap is used to calculate distance of each venue
   * key is venue id
   * value is distance
   */
  const distanceMap = new Map<string, number>();
  data.flat().forEach((entry) => {
    genreMap.set(entry.g, (genreMap.get(entry.g) || 0) + 1);
    typeMap.set(entry.t, (typeMap.get(entry.t) || 0) + 1);
    ratingMap.set(entry.n_id, entry.r);
    ratingMap.set(entry.p_id, entry.p_r);
    distanceMap.set(`${entry.p_id}->${entry.n_id}`, entry.d);
  });
  // transform the map to string prompt text
  const genreText = Array.from(genreMap.entries())
    .map(([genre, count]) => `${count} -> ${genre}`)
    .join(', ');
  const typeText = Array.from(typeMap.entries())
    .map(([type, count]) => `${count} -> ${type}`)
    .join(', ');
  const ratingText = Array.from(ratingMap.entries())
    .map(([id, rating]) => `${id} -> ${rating}`)
    .join(', ');
  const distanceText = Array.from(distanceMap.entries())
    .map(([id, distance]) => `${id} ${distance}`)
    .join(', ');
  const datasetText = `genre : ${genreText} venue-type : ${typeText} rating : ${ratingText} distance : ${distanceText}`;
  const gptPrompt = `Make an itinerary for a night based on the following dataset:
  keyword: distance below 3000, rating above 4, genre: TECHNO
  dataset text follows a strict format of "[id] -> [result]
  return only JSON format array of entries with keys of "id", "start_time", "end_time"
  ${datasetText}`;
  return gptPrompt;
}

type getPromptResult = {
  p_id: number; /// parent id
  p_t: VenueType; /// parent type
  p_r: number; /// parent rating
  p_g: mainMusicGenreString; /// parent genre
  n_id: number; /// id
  n: string; /// name
  r: number; /// rating
  t: VenueType; /// type
  g: mainMusicGenreString; /// genre
  d: number; /// distance in meters
};

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
    /**
     * remove duplicates
     */
    const nearest = [...toppestRatedBars, ...toppestRatedClubs]
      .filter((v, i, a) => a.findIndex((t) => t.id === v.id) === i)
      .sort((a, b) => b.rating - a.rating);
    const venueIds = nearest.map((v) => v.id);
    const now = new Date();
    const result = await Promise.all(
      venueIds.map(
        (id) =>
          prisma.$queryRaw<getPromptResult[]>`
          SELECT 
          v1.id AS p_id,
          v1.type as p_t,
          v1.rating as p_r, 
          v2.id AS n_id, 
          v2.type as t,
          v2.rating as r, 
          CAST(ST_Distance_Sphere(
              point(v1.longitude, v1.latitude), 
              point(v2.longitude, v2.latitude)
          ) AS SIGNED) AS d,
          g.mainGenre as g
      FROM 
          Venue v1 
          JOIN Venue v2 ON v1.id = ${id} AND v1.id != v2.id
          JOIN VenueGenre vg ON v2.id = vg.venueId
          JOIN Genre g ON vg.genreId = g.id
      WHERE 
          ST_Distance_Sphere(
              point(v1.longitude, v1.latitude), 
              point(v2.longitude, v2.latitude)
          ) < ${25 * 1000} -- meters
      ORDER BY 
          v1.id, 
          d, 
          r DESC 
      LIMIT 
          5;
        `
      )
    );
    console.log('query time', new Date().getTime() - now.getTime(), 'ms');
    return resultToPromptText(result);
  }),
  byPrompt: publicProcedure.input(byPromptZod).query(async ({ input }) => {
    const toppestRatedBarsPromise = prisma.venue.findMany({
      ...(input && {
        where: {
          city: input.city,
          averageEntryFee: {
            lte: input.maxEntryPrice,
          },
          averageDrinkPrice: {
            lte: input.maxDrinkPrice,
          },
          venueGenre: {
            some: {
              genre: {
                mainGenre: {
                  in: input.genre,
                },
              },
            },
          },
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
    const venueIds = [...toppestRatedBars, ...toppestRatedClubs].map(
      (v) => v.id
    );
    const result = await Promise.all(
      venueIds.map(
        (id) =>
          prisma.$queryRaw<{
            parent_id: number;
            near_id: number;
            name: string;
            rating: number;
          }>`
          SELECT 
          v1.id AS parent_id, 
          v2.id AS near_id, 
          v2.name, 
          v2.type,
          v2.rating, 
          ST_Distance_Sphere(
              point(v1.longitude, v1.latitude), 
              point(v2.longitude, v2.latitude)
          ) AS distance,
          g.parentGenre,
          g.mainGenre
      FROM 
          Venue v1 
          JOIN Venue v2 ON v1.id = ${id} AND v1.id != v2.id 
          JOIN VenueGenre vg ON v2.id = vg.venueId
          JOIN Genre g ON vg.genreId = g.id
      WHERE 
          ST_Distance_Sphere(
              point(v1.longitude, v1.latitude), 
              point(v2.longitude, v2.latitude)
          ) < ${input.maxDistance * 1000} -- meters
      ORDER BY 
          v1.id, 
          distance, 
          rating DESC 
      LIMIT 
          5;
        `
      )
    );

    // for each bar or club, search the ten nearest venues

    return [];
  }),
});
