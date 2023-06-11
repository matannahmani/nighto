/* eslint-disable @typescript-eslint/ban-ts-comment */
import { EventCard, VenueCard } from '@/component/pages/discover/DiscoverCard';
import { DiscoverSection } from '@/component/pages/discover/DiscoverSection';
import { api } from '@/utils/api';
import { SearchIcon } from '@chakra-ui/icons';
import {
  Button,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { useRef, useState, memo } from 'react';
import { useDebounce } from 'usehooks-ts';

function SearchModalBody({ searchValue }: { searchValue: string }) {
  const { data: searchResult, isLoading } = api.discover.search.useQuery(
    searchValue,
    {
      staleTime: 1000 * 60 * 60 * 24,
      keepPreviousData: true,
    }
  );
  return (
    <ModalBody gap={0} as={Stack}>
      <DiscoverSection
        href="./venue"
        key="search-venues"
        title="Venues"
        data={searchResult?.venues}
        isLoading={isLoading}
      />
      <DiscoverSection
        href="./event"
        key="search-events"
        title="Events"
        data={searchResult?.events}
        isLoading={isLoading}
      />
    </ModalBody>
  );
}
const SearchModalBodyMemoed = memo(SearchModalBody);

const NavbarSearch = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const inputRef = useRef<HTMLInputElement | null>();
  const [searchValue, setSearchValue] = useState<string>('');
  const debouncedSearchValue = useDebounce<string>(searchValue, 100);

  return (
    <>
      <IconButton
        variant={'ghost'}
        onClick={onOpen}
        icon={<SearchIcon />}
        size={{
          base: 'xs',
          sm: 'sm',
        }}
        aria-label={'search-venue'}
      />
      <Modal
        // @ts-ignore TODO: fix this
        initialFocusRef={inputRef}
        onClose={onClose}
        size={{
          base: 'full',
          md: 'sm',
        }}
        isOpen={isOpen}
        motionPreset="slideInBottom"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <InputGroup>
              <Input
                onChange={(e) => setSearchValue(e.target.value)}
                focusBorderColor="purple.400"
                pr={4}
                placeholder="Search venue or event"
                variant="flushed"
                // @ts-ignore TODO: fix this
                ref={inputRef}
              />
              <InputLeftElement pointerEvents="none">
                <SearchIcon color="gray.300" />
              </InputLeftElement>
            </InputGroup>
          </ModalHeader>
          <ModalCloseButton />
          <SearchModalBodyMemoed searchValue={debouncedSearchValue} />
        </ModalContent>
      </Modal>
    </>
  );
};
export default NavbarSearch;
