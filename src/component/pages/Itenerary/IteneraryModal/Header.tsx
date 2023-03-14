import { ChevronLeftIcon } from '@chakra-ui/icons';
import { ModalHeader, IconButton, Button } from '@chakra-ui/react';
import { useAtom, useAtomValue } from 'jotai';
import { stageAtom, canMoveAtom } from './atom';
import useItenaryModal from './useItenaryModal';

const Header = () => {
  const { onClose } = useItenaryModal();
  const [stage, setStage] = useAtom(stageAtom);
  const canMove = useAtomValue(canMoveAtom);

  if (stage === 5) return null;
  return (
    <ModalHeader display="flex">
      <IconButton
        variant="ghost"
        color="white"
        size="md"
        onClick={() => {
          if (stage === 0) return onClose();
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          setStage((s) => s - 1);
        }}
        aria-label="back"
        icon={<ChevronLeftIcon />}
      />
      <Button
        onClick={() =>
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          void setStage((s) => {
            if (s >= 5) return 4;
            return s + 1;
          })
        }
        isDisabled={!canMove}
        size="md"
        ml="auto"
        mr="2"
        variant="ghost"
        color="purple.400"
      >
        Next
      </Button>
    </ModalHeader>
  );
};

export default Header;
