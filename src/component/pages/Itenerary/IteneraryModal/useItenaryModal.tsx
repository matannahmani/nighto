import { useAtom } from 'jotai';
import { openAtom } from './atom';

const useItenaryModal = () => {
  const [isOpen, setOpen] = useAtom(openAtom);
  const onOpen = () => setOpen(true);
  const onClose = () => setOpen(false);
  return { isOpen, onOpen, onClose };
};

export default useItenaryModal;
