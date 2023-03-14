import {
  ModalHeader,
  ModalBody,
  RadioGroup,
  VStack,
  Radio,
  Divider,
  Text,
} from '@chakra-ui/react';
import { useAtomValue, useSetAtom, useAtom } from 'jotai';
import type { MouseEvent } from 'react';
import { useMemo } from 'react';
import { useEffect } from 'react';
import { stageAtom, canMoveAtom, venuePreferenceAtom } from '../atom';

function IteneraryVenueBody() {
  const stage = useAtomValue(stageAtom);
  if (stage !== 4) return null;
  return <IteneraryVenueBodyComp />;
}

function IteneraryVenueBodyComp() {
  const setMove = useSetAtom(canMoveAtom);

  const [venuePref, setVenuePref] = useAtom(venuePreferenceAtom);
  const handleVenuePrefChange = (
    e: MouseEvent<HTMLDivElement>,
    v: NonNullable<typeof venuePref>[number]
  ) => {
    e.stopPropagation();
    e.preventDefault();
    if (venuePref && venuePref?.length >= 3 && !venuePref?.includes(v)) return;
    if (venuePref?.includes(v)) {
      setVenuePref(venuePref?.filter((i) => i !== v));
    } else {
      setVenuePref([...(venuePref ?? []), v]);
    }
  };
  const isDisabled = useMemo(
    () => (!venuePref ? false : venuePref?.length >= 3),
    [venuePref]
  );
  useEffect(() => {
    setMove(!!(venuePref && venuePref?.length >= 1));
  }, [venuePref]);
  return (
    <>
      <ModalHeader py="0" fontSize="3xl">
        Let’s be more specific
      </ModalHeader>
      <ModalBody>
        <Text mb={4} color="gray.500">
          What’ the tone of your night
        </Text>

        <VStack spacing={2} alignItems="flex-start">
          <div onClick={(e) => handleVenuePrefChange(e, 'light')}>
            <Radio
              size="lg"
              isDisabled={!!(isDisabled && !venuePref?.includes('light'))}
              isChecked={venuePref?.includes('light')}
              colorScheme="purple"
              color="white"
              value={'light'}
            >
              Light, two bars and one club
            </Radio>
          </div>
          <Divider />
          <div onClick={(e) => handleVenuePrefChange(e, 'packed')}>
            <Radio
              size="lg"
              isDisabled={!!(isDisabled && !venuePref?.includes('packed'))}
              isChecked={venuePref?.includes('packed')}
              colorScheme="purple"
              color="white"
              value={'packed'}
            >
              Packed, two bars and two clubs
            </Radio>
          </div>
          <Divider />
          <div onClick={(e) => handleVenuePrefChange(e, 'clubs')}>
            <Radio
              size="lg"
              isDisabled={!!(isDisabled && !venuePref?.includes('clubs'))}
              isChecked={venuePref?.includes('clubs')}
              colorScheme="purple"
              color="white"
              value={'clubs'}
            >
              Focus on clubs
            </Radio>
          </div>
          <Divider />
          <div onClick={(e) => handleVenuePrefChange(e, 'bars')}>
            <Radio
              size="lg"
              isDisabled={!!(isDisabled && !venuePref?.includes('bars'))}
              isChecked={venuePref?.includes('bars')}
              colorScheme="purple"
              color="white"
              value={'bars'}
            >
              Focus on bars
            </Radio>
          </div>
          <Divider />
          <div onClick={(e) => handleVenuePrefChange(e, 'lounges')}>
            <Radio
              size="lg"
              isDisabled={!!(isDisabled && !venuePref?.includes('lounges'))}
              isChecked={venuePref?.includes('lounges')}
              colorScheme="purple"
              color="white"
              value={'lounges'}
            >
              Focus on lounges
            </Radio>
          </div>
        </VStack>
      </ModalBody>
    </>
  );
}

export default IteneraryVenueBody;
