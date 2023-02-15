import { z } from 'zod';

import { createTRPCRouter, publicProcedure } from '../trpc';

const venueList = [
  {
    id: 1,
    name: 'The Venue',
  },
  {
    id: 2,
    name: 'The Other Venue',
  },
  {
    id: 3,
    name: "Bernie's",
  },
  {
    id: 4,
    name: 'Faust',
  },
  {
    id: 5,
    name: 'The Hideout',
  },
  {
    id: 6,
    name: 'The Whistler',
  },
  {
    id: 7,
    name: 'Beat Kitchen',
  },
];

export const eventRouter = createTRPCRouter({
  search: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      const results = venueList.filter((venue) =>
        venue.name.toLowerCase().includes(input.text.toLowerCase())
      );
      return results ?? [];
    }),
});
