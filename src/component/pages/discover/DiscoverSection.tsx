import { Text, VStack } from '@chakra-ui/react';

const DiscoverSection = function <T extends string>({ label }: { label: T }) {
  return (
    <VStack spacing={4}>
      <Text fontSize="2xl" fontWeight="bold">
        {label}
      </Text>
    </VStack>
  );
};

export default DiscoverSection;
