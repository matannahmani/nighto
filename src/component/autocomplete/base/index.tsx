/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/unbound-method */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import type { ComboBoxProps } from '@react-types/combobox';
import type { LoadingState } from '@react-types/shared';
import { useComboBoxState } from 'react-stately';
import { useComboBox, useFilter } from 'react-aria';
import {
  Input,
  InputGroup,
  InputRightElement,
  FormLabel,
  Box,
  Spinner,
  InputLeftElement,
  Icon,
  Popover,
  PopoverBody,
  PopoverAnchor,
  PopoverContent,
  PopoverTrigger,
} from '@chakra-ui/react';
import { useRef } from 'react';
import { FaSearch } from 'react-icons/fa';
import { ListBox } from './ListBox';

export { Item, Section } from 'react-stately';

interface AutocompleteProps<T> extends ComboBoxProps<T> {
  loadingState?: LoadingState;
  onLoadMore?: () => void;
}

export function Autocomplete<T extends object>(props: AutocompleteProps<T>) {
  const { contains } = useFilter({ sensitivity: 'base' });
  const state = useComboBoxState({ ...props, defaultFilter: contains });

  const inputRef = useRef(null);
  const listBoxRef = useRef(null);
  const popoverRef = useRef(null);

  const { inputProps, listBoxProps, labelProps } = useComboBox(
    {
      ...props,
      inputRef,
      listBoxRef,
      popoverRef,
    },
    state
  );

  return (
    <Popover autoFocus={false} isOpen={state.isOpen} placement="bottom">
      <PopoverAnchor>
        <Box display="inline-block" position="relative">
          <FormLabel {...labelProps}>{props.label}</FormLabel>
          <InputGroup>
            <InputLeftElement>
              <Icon as={FaSearch} color="gray.500" />
            </InputLeftElement>
            <Input {...inputProps} variant="filled" ref={inputRef} size="md" />
            <InputRightElement>
              {props.loadingState === 'loading' ||
              props.loadingState === 'filtering' ? (
                <Spinner color="blue.400" size="sm" />
              ) : null}
            </InputRightElement>
          </InputGroup>
        </Box>
      </PopoverAnchor>
      <PopoverContent ref={popoverRef}>
        <PopoverBody>
          <ListBox
            {...listBoxProps}
            listBoxRef={listBoxRef}
            state={state}
            loadingState={props.loadingState}
            onLoadMore={props.onLoadMore}
          />
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
}
