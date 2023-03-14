import { atom } from 'jotai';
import { focusAtom } from 'jotai-optics';
import type { RouterInputs } from '@/utils/api';
type IteneraryPrompt = RouterInputs['discover']['byPrompt'];
export const IteneraryAtom = atom<
  {
    open: boolean;
    canMove: boolean;
    stage: 0 | 1 | 2 | 3 | 4 | 5;
  } & Partial<IteneraryPrompt>
>({
  open: true,
  stage: 0,
  canMove: false,
  price: undefined,
  maxDistance: undefined,
  venuePreference: undefined,
  genre: undefined,
  groupType: undefined,
});
export const canMoveAtom = focusAtom(IteneraryAtom, (optic) =>
  optic.prop('canMove')
);
export const priceAtom = focusAtom(IteneraryAtom, (optic) =>
  optic.prop('price')
);
export const maxDistanceAtom = focusAtom(IteneraryAtom, (optic) =>
  optic.prop('maxDistance')
);
export const groupTypeAtom = focusAtom(IteneraryAtom, (optic) =>
  optic.prop('groupType')
);
export const venuePreferenceAtom = focusAtom(IteneraryAtom, (optic) =>
  optic.prop('venuePreference')
);
export const genreAtom = focusAtom(IteneraryAtom, (optic) =>
  optic.prop('genre')
);
export const openAtom = focusAtom(IteneraryAtom, (optic) => optic.prop('open'));
export const stageAtom = focusAtom(IteneraryAtom, (optic) =>
  optic.prop('stage')
);
