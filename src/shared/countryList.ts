import country2iso from './country2iso.json';
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

type cityT = {
  name: string;
  longitude: number;
  latitude: number;
};

type countryMapT =
  | {
      fullName: string;
      shortname: string;
      flag: string;
      cities: cityT[];
    }
  | undefined
  | null;
const countryMap = new Map<string, countryMapT>();

type countryT = Record<
  'string',
  {
    name: string;
  }
>;

for (const key in country2iso) {
  countryMap.set(key, null);
}

countryMap.set('kr', {
  fullName: 'South Korea',
  shortname: 'korea',
  flag: '🇰🇷',
  cities: [
    {
      name: 'Seoul',
      longitude: 126.978291,
      latitude: 37.566535,
    },
    {
      name: 'Busan',
      longitude: 129.075642,
      latitude: 35.179554,
    },
  ],
});
