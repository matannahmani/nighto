import { useAtom, useSetAtom } from 'jotai';
import { IteneraryAtom, IteneraryAtomBase, openAtom } from './atom';

const useItenaryModal = () => {
  const [isOpen, setOpen] = useAtom(openAtom);
  const setItenerayAtom = useSetAtom(IteneraryAtom);
  const onOpen = () => setOpen(true);
  const onClose = () => {
    setItenerayAtom(IteneraryAtomBase);
  };
  return { isOpen, onOpen, onClose };
};

export default useItenaryModal;
