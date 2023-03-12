import { focusAtom } from 'jotai-optics';
import { countryListZod } from './countryList';
import Cookies from 'universal-cookie';
import { atomWithStorage, unstable_NO_STORAGE_VALUE } from 'jotai/utils';
import { z } from 'zod';
import type { SyncStorage } from 'jotai/vanilla/utils/atomWithStorage';
const cookies = new Cookies();
const discoverZod = countryListZod.extend({
  date: z.coerce.date(),
});
type discoverZ = z.infer<typeof discoverZod>;

const cookieStorage: SyncStorage<discoverZ> = {
  getItem: (key) => {
    const loc = cookies.get<string | undefined | object>(key);
    try {
      return discoverZod.parse(
        typeof loc === 'object' ? loc : JSON.parse(loc ?? '')
      );
    } catch (err) {}
    return unstable_NO_STORAGE_VALUE;
  },
  setItem: (ctx, value) => {
    cookies.set(ctx, JSON.stringify(value));
  },
  removeItem: (ctx) => cookies.remove(ctx),
};

const discoverAtom = atomWithStorage<discoverZ>(
  'location',
  {
    date: new Date(),
    country: 'korea',
    city: 'Seoul',
  },
  cookieStorage
);

export const getDiscovery = () => {
  const loc = cookies.get<string | undefined | object>('location');
  try {
    return discoverZod.parse(
      typeof loc === 'object' ? loc : JSON.parse(loc ?? '')
    );
  } catch (err) {}
  return {
    date: new Date(),
    country: 'korea',
    city: 'Seoul',
  };
};

export const dateAtom = focusAtom(discoverAtom, (optic) => optic.prop('date'));
export const countryAtom = focusAtom(discoverAtom, (optic) =>
  optic.prop('country')
);
export const cityAtom = focusAtom(discoverAtom, (optic) => optic.prop('city'));
