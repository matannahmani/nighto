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
import { useEffect } from 'react';
import { stageAtom, canMoveAtom, groupTypeAtom } from '../atom';

function IteneraryTypeBody() {
  const stage = useAtomValue(stageAtom);
  if (stage !== 0) return null;
  return <IteneraryTypeBodyComp />;
}

function IteneraryTypeBodyComp() {
  const setMove = useSetAtom(canMoveAtom);

  const [groupType, setGroupType] = useAtom(groupTypeAtom);
  const handleGroupTypeChange = (v: string) => {
    void setGroupType(v as typeof groupType);
  };
  useEffect(() => {
    setMove(!!groupType);
  }, [groupType]);
  return (
    <>
      <ModalHeader py="0" fontSize="3xl">
        Let’s be more specific
      </ModalHeader>
      <ModalBody>
        <Text mb={4} color="gray.500">
          Who are you spending the event with
        </Text>
        <RadioGroup
          onChange={handleGroupTypeChange}
          value={groupType}
          size="lg"
          colorScheme="purple"
          color="white"
        >
          <VStack spacing={2} alignItems="flex-start">
            <Radio value={'couple'}>Partner</Radio>
            <Divider />
            <Radio value={'group'}>Group of friends (2-5)</Radio>
            <Divider />

            <Radio value={'singlefriend'}>Single friend</Radio>
            <Divider />
            <Radio value={'solo'}>Solo</Radio>
            <Divider />

            <Radio value={'wife/husband'}>Your wife / husband</Radio>
          </VStack>
        </RadioGroup>
      </ModalBody>
    </>
  );
}

export default IteneraryTypeBody;
