import { api } from '@/utils/api';
import { ChevronLeftIcon } from '@chakra-ui/icons';
import { ModalHeader, IconButton, Button } from '@chakra-ui/react';
import { useAtom, useAtomValue } from 'jotai';
import type { IteneraryPrompt } from './atom';
import { stageAtom, canMoveAtom, IteneraryAtom } from './atom';
import useItenaryModal from './useItenaryModal';

export const useGenerateItenerary = () => {
  const generateIteneraryMutation =
    api.protected.discover.generate.useMutation();
  const { open, stage, canMove, ...payload } = useAtomValue(IteneraryAtom);
  const generateItenerary = async () => {
    if (
      !payload.genre ||
      !payload.groupType ||
      !payload.maxDistance ||
      !payload.venuePreference ||
      !payload.price
    )
      return;
    const res = await generateIteneraryMutation.mutateAsync({
      ...(payload as IteneraryPrompt),
      city: 'Seoul',
    });
    return res;
  };
  return {
    generateItenerary,
    mutation: generateIteneraryMutation,
  };
};

export type useGenerateIteneraryReturn = ReturnType<
  typeof useGenerateItenerary
>;

const Header = (props: useGenerateIteneraryReturn) => {
  const { onClose } = useItenaryModal();
  const [stage, setStage] = useAtom(stageAtom);
  const canMove = useAtomValue(canMoveAtom);
  const { generateItenerary, mutation } = props;
  return (
    <ModalHeader
      pb={{
        base: '2',
        md: '0',
      }}
      display="flex"
    >
      <IconButton
        variant="ghost"
        color="white"
        size="md"
        isDisabled={mutation.isLoading}
        onClick={() => {
          if (stage === 0 || stage === 5) return onClose();
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          setStage((s) => s - 1);
        }}
        aria-label="back"
        icon={<ChevronLeftIcon />}
      />
      <Button
        onClick={() => {
          if (stage === 4) {
            setStage(5);
            void generateItenerary();
            return;
          }
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          void setStage((s) => {
            if (s >= 5) return 4;
            return s + 1;
          });
        }}
        isDisabled={!canMove || stage === 5}
        isLoading={mutation.isLoading}
        size="md"
        ml="auto"
        mr="2"
        variant="ghost"
        color="purple.400"
      >
        {stage === 4 ? 'Generate' : 'Next'}
      </Button>
    </ModalHeader>
  );
};

export default Header;
