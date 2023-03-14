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
} from '@chakra-ui/react';
import { useAtomValue, useSetAtom, useAtom } from 'jotai';
import { useEffect } from 'react';
import { stageAtom, canMoveAtom, priceAtom } from '../atom';

function IteneraryPriceBody() {
  const stage = useAtomValue(stageAtom);
  if (stage !== 2) return null;
  return <IteneraryPriceBodyComp />;
}

function IteneraryPriceBodyComp() {
  const setMove = useSetAtom(canMoveAtom);

  const [price, setPrice] = useAtom(priceAtom);
  const handlePriceChange = (v: string) => {
    void setPrice(v as typeof price);
  };
  useEffect(() => {
    setMove(!!price);
  }, [price]);
  return (
    <>
      <ModalHeader py="0" fontSize="3xl">
        Let’s be more specific
      </ModalHeader>
      <ModalBody>
        <Text mb={4} color="gray.500">
          How much are you willing to spend
        </Text>
        <RadioGroup
          onChange={handlePriceChange}
          value={price}
          size="lg"
          colorScheme="purple"
          color="white"
        >
          <VStack spacing={2} alignItems="flex-start">
            <Tooltip
              hasArrow
              label="Cheap entry and drinks (25-75$ a night)"
              placement="top-end"
            >
              <div>
                <Radio value={'1'}>$</Radio>
                <InfoIcon ml={'2'} mb="2" fontSize="12px" />
              </div>
            </Tooltip>
            <Divider />
            <Tooltip
              hasArrow
              label="Fair entry and drinks (50-100$ a night)"
              placement="top-end"
            >
              <div>
                <Radio value={'2'}>$$</Radio>
                <InfoIcon ml={'2'} mb="2" fontSize="12px" />
              </div>
            </Tooltip>{' '}
            <Divider />
            <Tooltip
              hasArrow
              label="Expensive entry and drinks (100$+)"
              placement="top-end"
            >
              <div>
                <Radio value={'3'}>$$$</Radio>
                <InfoIcon ml={'2'} mb="2" fontSize="12px" />
              </div>
            </Tooltip>{' '}
            <Divider />
            hasArrow
            <Tooltip label="NO limit" placement="top-end">
              <div>
                <Radio value={'4'}>$$$$</Radio>
                <InfoIcon ml={'2'} mb="2" fontSize="12px" />
              </div>
            </Tooltip>{' '}
          </VStack>
        </RadioGroup>
      </ModalBody>
    </>
  );
}

export default IteneraryPriceBody;
