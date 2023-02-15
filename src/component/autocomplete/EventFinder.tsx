import { api } from '@/utils/api';
import { Flex, FormControl, FormHelperText, FormLabel } from '@chakra-ui/react';

import { useState } from 'react';
import { Autocomplete, Item } from './base';

function EventFinderInput() {
  const [search, setSearch] = useState('');
  const { data, isLoading } = api.event.search.useQuery({ text: search ?? '' });

  return (
    <Flex justify="center" align="center" w="full">
      <Autocomplete
        placeholder="Search Event, Venue, or Artist"
        // placeholder=""
        items={data ?? []}
        inputValue={search}
        onInputChange={(e) => setSearch(e)}
        loadingState={isLoading ? 'loading' : 'idle'}
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        onLoadMore={() => {}}
      >
        {(item) => <Item key={item.id}>{item.name}</Item>}
      </Autocomplete>
    </Flex>
  );
}

export default EventFinderInput;
