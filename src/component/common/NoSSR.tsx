import { Box, Progress, useColorMode } from '@chakra-ui/react';
import type { ReactElement } from 'react';
import { useEffect, useState } from 'react';

const useColorModeFirstTime = () => {
  const [mounted, setMounted] = useState(false);
  const { colorMode: initalColorMode, setColorMode } = useColorMode();
  useEffect(() => {
    const colorMode = localStorage.getItem('chakra-ui-color-mode');
    if (colorMode) {
      if (initalColorMode !== colorMode) {
        setColorMode(colorMode === 'light' ? 'light' : 'dark');
      }
    }
    setMounted(true);
  }, []);
  return mounted;
};

const NoSSR = ({ children }: { children: ReactElement }) => {
  const mounted = useColorModeFirstTime();
  if (!mounted)
    return (
      <Box
        position="fixed"
        top="50%"
        left="50%"
        transform="translate(-50%, -50%)"
      >
        <Progress />
      </Box>
    );

  return children;
};
export default NoSSR;
