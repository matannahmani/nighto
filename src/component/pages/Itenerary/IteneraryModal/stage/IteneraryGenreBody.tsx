import { ModalHeader, ModalBody, Text, Button, Flex } from '@chakra-ui/react';
import { mainMusicGenre } from '@prisma/client';
import { useAtomValue, useSetAtom, useAtom } from 'jotai';
import { useEffect } from 'react';
import { stageAtom, canMoveAtom, genreAtom } from '../atom';

const Bubble = ({
  value,
  selected,
  disabled,
  onChange,
}: {
  value: keyof typeof mainMusicGenre;
  selected: boolean;
  disabled: boolean;
  onChange: (v: keyof typeof mainMusicGenre) => void;
}) => {
  return (
    <Button
      onClick={() => onChange(value)}
      variant={selected ? 'solid' : 'outline'}
      size="sm"
      borderRadius="full"
      isActive={selected}
      isDisabled={disabled}
      bg={selected ? 'purple.500' : 'inital'}
      borderColor={selected ? 'purple.500' : 'purple.400'}
      color={selected ? 'white' : 'purple.400'}
      colorScheme="purple"
    >
      {value}
    </Button>
  );
};

function IteneraryGenreBody() {
  const stage = useAtomValue(stageAtom);
  if (stage !== 1) return null;
  return <IteneraryGenreBodyComp />;
}

function IteneraryGenreBodyComp() {
  const setMove = useSetAtom(canMoveAtom);

  const [genre, setGenre] = useAtom(genreAtom);

  useEffect(() => {
    setMove(!!(genre && genre?.length > 0));
  }, [genre, setMove]);
  return (
    <>
      <ModalHeader py="0" fontSize="3xl">
        Genres
      </ModalHeader>

      <ModalBody>
        <Text mb={4} color="gray.500">
          Select a few genres based on your interests to get started.
        </Text>
        <Flex gap={2} wrap="wrap">
          {Object.keys(mainMusicGenre).map((key: string) => {
            const value = key as keyof typeof mainMusicGenre;
            return (
              <Bubble
                key={value}
                value={value}
                disabled={
                  !!genre && genre?.length >= 5 && !genre?.includes(key)
                }
                selected={!!genre?.includes(key)}
                onChange={(v) => {
                  if (genre?.includes(v)) {
                    setGenre(genre.filter((g) => g !== v));
                  } else {
                    setGenre([...(genre ?? []), v]);
                  }
                }}
              />
            );
          })}
        </Flex>
      </ModalBody>
    </>
  );
}

export default IteneraryGenreBody;
