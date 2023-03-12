import { z } from 'zod';

export const countryList = [
  {
    name: 'South Korea',
    code: 'korea',
    cities: ['Seoul', 'Busan'],
    flag: '🇰🇷',
  },
  {
    name: 'Japan',
    code: 'japan',
    cities: ['Tokyo', 'Osaka', 'Kyoto'],
    flag: '🇯🇵',
  },
] as const;
export type CityCode = (typeof countryList)[number]['code'];
export type City = (typeof countryList)[number]['cities'][number];

const codeList: [CityCode, ...CityCode[]] = [
  countryList[0].code,
  // And then merge in the remaining values from `properties`
  ...countryList.slice(1).map((p) => p.code),
];
const cityList: [City, ...City[]] = [
  ...countryList[0].cities,
  // And then merge in the remaining values from `properties`
  ...countryList.slice(1).flatMap((p) => p.cities),
];
export const countryListZod = z.object({
  country: z.enum(codeList),
  city: z.enum(cityList),
});

export type countryListZ = z.infer<typeof countryListZod>;

export type Country = (typeof countryList)[number];
