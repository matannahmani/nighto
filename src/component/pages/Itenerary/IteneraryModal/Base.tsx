import { Modal, ModalOverlay, ModalContent } from '@chakra-ui/react';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import Header from './Header';
import IteneraryGenreBody from './stage/IteneraryGenreBody';
import IteneraryPriceBody from './stage/IteneraryPriceBody';
import IteneraryTransportationBody from './stage/IteneraryTransportationBody';
import IteneraryTypeBody from './stage/IteneraryTypeBody';
import IteneraryVenueBody from './stage/IteneraryVenueBody';
import useItenaryModal from './useItenaryModal';

function IteneraryModal() {
  const { onClose, isOpen } = useItenaryModal();
  const [ref] = useAutoAnimate();

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
        <ModalContent ref={ref}>
          <Header />
          <IteneraryTypeBody />
          <IteneraryGenreBody />
          <IteneraryPriceBody />
          <IteneraryTransportationBody />
          <IteneraryVenueBody />
        </ModalContent>
      </Modal>
    </>
  );
}
export default IteneraryModal;
