import { InfoIcon } from '@chakra-ui/icons';
import {
  ModalHeader,
  ModalBody,
  RadioGroup,
  VStack,
  Radio,
  Divider,
  Text,
  Tooltip,
  Box,
  SliderFilledTrack,
  SliderThumb,
  Slider,
  SliderMark,
  SliderTrack,
} from '@chakra-ui/react';
import { useAtomValue, useSetAtom, useAtom } from 'jotai';
import { memo, useEffect, useState } from 'react';
import { stageAtom, canMoveAtom, maxDistanceAtom } from '../atom';

const labelStyles = {
  mt: '2',
  ml: '-2.5',
  p: '2px 6px',
  w: '80px',
  borderRadius: '8px',
  fontSize: 'sm',
};

function TransportRadioGroup() {
  const [maxDistance, setMaxDistance] = useAtom(maxDistanceAtom);
  const handleMaxDistanceChange = (v: string) => {
    void setMaxDistance(Number(v));
  };
  return (
    <RadioGroup
      onChange={handleMaxDistanceChange}
      value={maxDistance?.toString() ?? ''}
      size="lg"
      colorScheme="purple"
      color="white"
    >
      <VStack spacing={2} alignItems="flex-start">
        <Tooltip
          hasArrow
          label="Walking, E-Scooter, Bicycle 🚶🚲🛴"
          placement="top-end"
        >
          <div>
            <Radio value={'1'}>Nearby</Radio>
            <InfoIcon ml={'2'} mb="2" fontSize="12px" />
          </div>
        </Tooltip>
        <Divider />

        <Tooltip
          hasArrow
          label="Taxi, E-Scooter, Bicycle 🚕🚲🛴"
          placement="top-end"
        >
          <div>
            <Radio value={'5'}>Around the Block</Radio>
            <InfoIcon ml={'2'} mb="2" fontSize="12px" />
          </div>
        </Tooltip>
        <Divider />

        <Tooltip hasArrow label="Taxi, Bus, Train 🚕🚌🚆" placement="top-end">
          <div>
            <Radio value={'15'}>Around the Town</Radio>
            <InfoIcon ml={'2'} mb="2" fontSize="12px" />
          </div>
        </Tooltip>
        <Divider />

        <Tooltip hasArrow label="Taxi, Bus, Train 🚕🚌🚆" placement="top-end">
          <div>
            <Radio value={'25'}>Around the City</Radio>
            <InfoIcon ml={'2'} mb="2" fontSize="12px" />
          </div>
        </Tooltip>
      </VStack>
    </RadioGroup>
  );
}

function TransportSlider() {
  const [showTooltip, setShowTooltip] = useState(false);
  const [maxDistance, setMaxDistance] = useAtom(maxDistanceAtom);

  return (
    <Box pt={10} pb={2} px={4}>
      <Slider
        max={25}
        min={1}
        colorScheme="teal"
        aria-label="slider-ex-6"
        value={maxDistance ?? 1}
        onTouchStart={() => setShowTooltip(true)}
        onTouchEnd={() => setShowTooltip(false)}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        onChange={(val) => {
          if (val !== maxDistance) setMaxDistance(val);
        }}
      >
        <SliderMark value={1} sx={labelStyles}>
          1km
        </SliderMark>
        <SliderMark value={5} sx={labelStyles}>
          5km
        </SliderMark>
        <SliderMark value={15} sx={labelStyles}>
          15km
        </SliderMark>
        <SliderMark value={25} sx={labelStyles}>
          25km
        </SliderMark>
        <SliderTrack>
          <SliderFilledTrack />
        </SliderTrack>
        <Tooltip
          hasArrow
          bg="teal.500"
          color="white"
          placement="top"
          isOpen={showTooltip}
          label={`${(maxDistance ?? 0) * 1000} m`}
        >
          <SliderThumb />
        </Tooltip>
      </Slider>
    </Box>
  );
}

function IteneraryTransportationBody() {
  const stage = useAtomValue(stageAtom);
  if (stage !== 3) return null;
  return <IteneraryTransportationBodyComp />;
}

function IteneraryTransportationBodyComp() {
  const setMove = useSetAtom(canMoveAtom);

  const maxDistance = useAtomValue(maxDistanceAtom);

  useEffect(() => {
    setMove(maxDistance !== undefined);
  }, [maxDistance, setMove]);
  return (
    <>
      <ModalHeader py="0" fontSize="3xl">
        Let’s be more specific
      </ModalHeader>
      <ModalBody>
        <Text mb={4} color="gray.500">
          How far are you willing to go
        </Text>
        <TransportRadioGroup />
        <TransportSlider />
      </ModalBody>
    </>
  );
}

export default memo(IteneraryTransportationBody);
