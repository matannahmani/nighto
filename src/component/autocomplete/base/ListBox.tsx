/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-use-before-define */
import type { AriaListBoxOptions } from '@react-aria/listbox';
import type { Node, LoadingState } from '@react-types/shared';
import type { ListState } from 'react-stately';
import { useListBox, useOption } from 'react-aria';
import { List, ListItem, Icon } from '@chakra-ui/react';
import type { RefObject } from 'react';
import { useRef } from 'react';
import { FaSearch } from 'react-icons/fa';

interface ListBoxProps extends AriaListBoxOptions<unknown> {
  listBoxRef?: RefObject<HTMLUListElement>;
  state: ListState<unknown>;
  loadingState?: LoadingState;
  onLoadMore?: () => void;
}

interface OptionProps {
  item: Node<unknown>;
  state: ListState<unknown>;
}

export function ListBox(props: ListBoxProps) {
  const ref = useRef<HTMLUListElement>(null);
  const { listBoxRef = ref, state } = props;
  const { listBoxProps } = useListBox(props, state, listBoxRef);

  return (
    <List
      {...listBoxProps}
      ref={listBoxRef}
      overflow="auto"
      width="100%"
      maxHeight="300"
      my="1"
      display="flex"
      flexDirection="column"
    >
      {[...state.collection].map((item) => (
        <Option key={item.key} item={item} state={state} />
      ))}
    </List>
  );
}

function Option({ item, state }: OptionProps) {
  const ref = useRef<HTMLLIElement>(null);
  const { optionProps, isSelected, isFocused } = useOption(
    {
      key: item.key,
    },
    state,
    ref
  );

  return (
    <ListItem
      {...optionProps}
      as="li"
      ref={ref}
      px="2"
      py="2"
      background={isFocused ? 'blue.50' : 'white'}
      color={isFocused ? 'blue.700' : 'gray.700'}
      fontWeight={isSelected ? 'bold' : 'normal'}
      cursor="default"
      display="flex"
      alignItems="center"
      justifyContent="space-between"
    >
      {item.rendered}
      {isSelected && <Icon as={FaSearch} />}
    </ListItem>
  );
}
