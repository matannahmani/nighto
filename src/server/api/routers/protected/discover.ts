/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { prisma } from '@/server/db';
import type { VenueType } from '@prisma/client';
import { mainMusicGenre } from '@prisma/client';
import { Configuration, OpenAIApi } from 'openai';
import { z } from 'zod';

import { createTRPCRouter, publicProcedure } from '../../trpc';

const byPromptZod = z.object({
  genre: z.nativeEnum(mainMusicGenre).array(),
  city: z.string(),
  groupType: z
    .literal('solo')
    .or(z.literal('group'))
    .or(z.literal('couple'))
    .or(z.literal('wife/husband'))
    .or(z.literal('singlefriend')),
  price: z
    .literal('1')
    .or(z.literal('2'))
    .or(z.literal('3'))
    .or(z.literal('4')),
  maxDistance: z.number().min(1).max(50),
  venuePreference: z.array(
    z
      .literal('light')
      .or(z.literal('packed'))
      .or(z.literal('clubs'))
      .or(z.literal('bars'))
      .or(z.literal('lounges'))
  ),
});

type mainMusicGenreString = keyof typeof mainMusicGenre;

function resultToPromptText(
  data: getPromptResult[][],
  input: z.infer<typeof byPromptZod>
) {
  const genreMap = new Map<mainMusicGenreString, number>();
  const nameMap = new Map<number, string>();
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
    nameMap.set(entry.n_id, entry.n_n);
    nameMap.set(entry.p_id, entry.p_n);
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
  const nameText = Array.from(nameMap.entries())
    .map(([id, name]) => `${id} -> ${name}`)
    .join(', ');
  const distanceText = Array.from(distanceMap.entries())
    .map(([id, distance]) => `${id} ${distance}`)
    .join(', ');
  const systemPrompt = `I have a dataset of venues with the following information:
  the format is: [id] -> [value], for distance it is [id1]->[id2] [distance]
    name: ${nameText}
    genre: ${genreText}
    venue-type: ${typeText}
    rating: ${ratingText}
    distance: ${distanceText}
    `;
  const userPrompt = `make an itinerary for a night using the provided dataset, my preferences are:
    genre: ${input.genre.join(',')}
    distance: ${input.maxDistance * 1000}
    venue-type: ${input.venuePreference.join(',')}
    and im ${input.groupType}`;
  return {
    system: systemPrompt,
    user: userPrompt,
  };
}

type getPromptResult = {
  p_id: number; /// parent id
  p_t: VenueType; /// parent type
  p_n: string; /// parent name
  p_r: number; /// parent rating
  p_g: mainMusicGenreString; /// parent genre
  n_id: number; /// id
  n_n: string; /// name
  r: number; /// rating
  t: VenueType; /// type
  g: mainMusicGenreString; /// genre
  d: number; /// distance in meters
};
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

function extractJSONFromString(str: string) {
  const start = str.indexOf('{');
  const end = str.lastIndexOf('}') + 1;
  return JSON.parse(str.substring(start, end));
}

const aiResponseZod = z.object({
  venueList: z.array(
    z.object({
      id: z.number(),
      enterTime: z.string(),
      leaveTime: z.string(),
    })
  ),
  explanation: z.string(),
});

const generateAI = async (prompt: { system: string; user: string }) => {
  const completion = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    messages: [
      {
        role: 'system',
        content: `During this conversation you will only responed in the following format:
          JSON: { "venueList": [{id: number,enterTime: string,leaveTime: string}], "explanation": string }
          IMPORTANT NOTE: explanation should be user friendly and non robotic`,
      },
      {
        role: 'system',
        content: prompt.system,
      },
      {
        role: 'user',
        content: prompt.user,
      },
    ],
  });
  const raw = completion?.data?.choices?.[0]?.message?.content?.trim() ?? '';
  try {
    return {
      result: aiResponseZod.parse(extractJSONFromString(raw)),
      raw,
      code: 0,
    };
  } catch (e) {
    console.error("can't parse ai response", e);
    return { result: null, raw, code: -1 };
  }
};

/**
 * This is event router for public API
 */
export const protectedDiscoverRouter = createTRPCRouter({
  generate: publicProcedure.input(byPromptZod).mutation(async ({ input }) => {
    const toppestRatedBarsPromise = prisma.venue.findMany({
      ...(input && {
        where: {
          city: input.city,
          averageEntryFee: {
            lte: input.price === '4' ? 9999 : Number(input.price) * 15,
          },
          averageDrinkPrice: {
            lte: input.price === '4' ? 9999 : Number(input.price) * 2 + 6,
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
          prisma.$queryRaw<getPromptResult[]>`
          SELECT 
          v1.id AS p_id,
          v1.type as p_t,
        v1.name as p_n,
          v1.rating as p_r, 
          v2.id AS n_id,
        v2.name as n_n,
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
          ) < ${input.maxDistance * 1000} -- meters
      ORDER BY 
          v1.id, 
          d, 
          r DESC 
      LIMIT 
          5;
        `
      )
    );
    const prompt = resultToPromptText(result, input);
    const nowBeforeAI = new Date();
    const aiResult = await generateAI(prompt);
    console.log('ai time', new Date().getTime() - nowBeforeAI.getTime(), 'ms');
    return {
      ai: aiResult,
      toppestRatedBars,
      toppestRatedClubs,
    };
  }),
});
