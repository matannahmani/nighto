import { Modal, ModalOverlay, ModalContent } from '@chakra-ui/react';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import Header, { useGenerateItenerary } from './Header';
import IteneraryFinalBody from './stage/IteneraryFinalBody';
import IteneraryGenreBody from './stage/IteneraryGenreBody';
import IteneraryPriceBody from './stage/IteneraryPriceBody';
import IteneraryTransportationBody from './stage/IteneraryTransportationBody';
import IteneraryTypeBody from './stage/IteneraryTypeBody';
import IteneraryVenueBody from './stage/IteneraryVenueBody';
import useItenaryModal from './useItenaryModal';

function IteneraryModal() {
  const { onClose, isOpen } = useItenaryModal();
  const [ref] = useAutoAnimate();
  const mutation = useGenerateItenerary();

  return (
    <>
      <Modal
        size={{
          base: 'full',
          md: 'md',
        }}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent pb="8" ref={ref}>
          <Header {...mutation} />
          <IteneraryTypeBody />
          <IteneraryGenreBody />
          <IteneraryPriceBody />
          <IteneraryTransportationBody />
          <IteneraryVenueBody />
          <IteneraryFinalBody {...mutation} />
        </ModalContent>
      </Modal>
    </>
  );
}
export default IteneraryModal;
