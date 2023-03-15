import { Heading, Tag, HStack } from '@chakra-ui/react';

const CategoryTag = ({
  name,
  gradient,
  isSelected,
}: {
  isSelected?: boolean;
  name: string;
  gradient: string;
}) => {
  return (
    <Tag
      borderRadius={4}
      h={16}
      minW={24}
      justifyContent="center"
      variant="solid"
      overflow="visible"
      colorScheme="teal"
      bgGradient={gradient}
      boxShadow={isSelected ? 'xl' : 'none'}
      _hover={{
        bgGradient: gradient,
        boxShadow: 'xl',
      }}
    >
      {name}
    </Tag>
  );
};

const HomeCategories = () => {
  return (
    <>
      <Heading as="h2" size="lg">
        Categories
      </Heading>
      <HStack
        px={1}
        maxW="100vw"
        spacing={2}
        alignItems="flex-start"
        overflowX="auto"
      >
        <CategoryTag
          isSelected
          name="Techno"
          gradient="linear(to-r, teal.500,green.500)"
        />
        <CategoryTag name="House" gradient="linear(to-r, red.500,orange.500)" />
        <CategoryTag
          name="Drum & Bass"
          gradient="linear(to-r, blue.500,purple.500)"
        />
        <CategoryTag name="Dubstep" gradient="linear(to-r, pink.500,red.500)" />
        <CategoryTag
          name="Trance"
          gradient="linear(to-r, yellow.500,orange.500)"
        />
        <CategoryTag
          name="Hardstyle"
          gradient="linear(to-r, purple.500,blue.500)"
        />
        <CategoryTag name="Trap" gradient="linear(to-r, green.500,teal.500)" />
        <CategoryTag
          name="Dance"
          gradient="linear(to-r, orange.500,yellow.500)"
        />
        <CategoryTag name="EDM" gradient="linear(to-r, red.500,pink.500)" />
        <CategoryTag
          name="Hip Hop"
          gradient="linear(to-r, green.500,teal.500)"
        />
      </HStack>
    </>
  );
};

export default HomeCategories;
