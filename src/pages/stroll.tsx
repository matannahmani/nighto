import {
  Button,
  Input,
  Stack,
  Text,
  Heading,
  Divider,
  List,
  ListItem,
  Badge,
  Flex,
  useColorMode,
} from '@chakra-ui/react';
function Example() {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <header>
      <Button onClick={toggleColorMode}>
        Toggle {colorMode === 'light' ? 'Dark' : 'Light'}
      </Button>
    </header>
  );
}
function NightFinder() {
  return (
    <Stack spacing={6} p={8}>
      <Flex bg="gray.600" h={6} w={'100vw'} />
      <Example />
      <Heading>NightFinder</Heading>
      <Stack direction="row" justify="space-between">
        <Input placeholder="Location" size="lg" />
        <Input placeholder="Preferences" size="lg" />
        <Button colorScheme="blue" size="lg">
          Search
        </Button>
      </Stack>
      <Divider />
      <Stack>
        <Text fontSize="2xl" fontWeight="bold">
          Search Results
        </Text>
        <List spacing={3}>
          <ListItem>
            <Text fontSize="xl">Bar 1</Text>
          </ListItem>
          <ListItem>
            <Text fontSize="xl">Bar 2</Text>
          </ListItem>
          <ListItem>
            <Text fontSize="xl">Bar 3</Text>
          </ListItem>
        </List>
      </Stack>
      <Stack>
        <Text fontSize="2xl" fontWeight="bold">
          Popular Places
        </Text>
        <List spacing={3}>
          <ListItem>
            <Stack direction="row" justify="space-between">
              <Text fontSize="xl">Bar 4</Text>
              <Badge colorScheme="green">10 people inside</Badge>
            </Stack>
          </ListItem>
          <ListItem>
            <Stack direction="row" justify="space-between">
              <Text fontSize="xl">Bar 5</Text>
              <Badge colorScheme="green">5 people inside</Badge>
            </Stack>
          </ListItem>
          <ListItem>
            <Stack direction="row" justify="space-between">
              <Text fontSize="xl">Bar 6</Text>
              <Badge colorScheme="green">15 people inside</Badge>
            </Stack>
          </ListItem>
        </List>
      </Stack>
      <Button colorScheme="blue" size="lg" w="full">
        Create Your Itinerary
      </Button>
    </Stack>
  );
}

export default NightFinder;
