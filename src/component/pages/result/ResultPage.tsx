import { Box, Flex, Heading, Text } from '@chakra-ui/react';
import { CloseIcon } from '@chakra-ui/icons';
import { WarningTwoIcon } from '@chakra-ui/icons';
import { InfoIcon } from '@chakra-ui/icons';
import { CheckCircleIcon } from '@chakra-ui/icons';

type status = 'error' | 'warning' | 'info' | 'success';
/**
 * return bg color, icon, heading, description
 * @param status
 */
function statusToFormat(status: status) {
  switch (status) {
    case 'error':
      return {
        bg: 'red',
        icon: <CloseIcon boxSize={'20px'} color={'white'} />,
        heading: 'Something went wrong',
        description:
          'We are sorry, but something went wrong. Please try again later.',
      };
    case 'warning':
      return {
        bg: 'yellow',
        icon: <WarningTwoIcon boxSize={'20px'} color={'white'} />,
        heading: 'Something went wrong',
        description:
          'We are sorry, but something went wrong. Please try again later.',
      };
    case 'info':
      return {
        bg: 'blue',
        icon: <InfoIcon boxSize={'20px'} color={'white'} />,
        heading: "We're working on it",
        description: "We're working on it. Please try again later.",
      };
    case 'success':
      return {
        bg: 'green',
        icon: <CheckCircleIcon boxSize={'20px'} color={'white'} />,
        heading: 'Success',
        description: 'Operation completed successfully.',
      };
  }
}

export default function ResultPage({
  status,
  headline,
  description,
}: {
  status?: status;
  headline?: string;
  description?: string;
}) {
  const {
    bg,
    icon,
    heading,
    description: descriptionDefault,
  } = statusToFormat(status ?? 'error');
  return (
    <Box textAlign="center" py={10} px={6}>
      <Box display="inline-block">
        <Flex
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          bg={bg}
          rounded={'50px'}
          w={'55px'}
          h={'55px'}
          textAlign="center"
        >
          {icon}
        </Flex>
      </Box>
      <Heading as="h2" size="xl" mt={6} mb={2}>
        {headline ?? heading}
      </Heading>
      <Text color={'gray.500'}>{description ?? descriptionDefault}</Text>
    </Box>
  );
}
