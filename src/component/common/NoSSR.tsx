import { Box, Progress, useColorMode } from '@chakra-ui/react';
import type { ReactElement } from 'react';

const NoSSR = ({ children }: { children: ReactElement }) => {
  return children;
};
export default NoSSR;
