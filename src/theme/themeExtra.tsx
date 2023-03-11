// file: theme.tsx
import type { ThemeConfig } from '@chakra-ui/react';
import { extendTheme, ChakraProvider } from '@chakra-ui/react';
import type { PropsWithChildren } from 'react';
import {
  ThemeProvider as NextThemeProvider,
  useTheme as useNextTheme,
} from 'next-themes';
import { theme } from './theme';

export type UseThemeProps = {
  resolvedTheme?: 'light' | 'dark';
  setTheme: (theme: string) => void;
};

export const ThemeProvider = ({ children }: PropsWithChildren<unknown>) => {
  const { resolvedTheme } = useNextTheme() as UseThemeProps;
  const colorModeConfig: ThemeConfig = {
    initialColorMode: 'dark',
    useSystemColorMode: false, // change to false disable system-color-select
  };
  const flashlessTheme = extendTheme(theme, { config: colorModeConfig });

  // remove enableSystem to disable system-color-select
  return (
    <NextThemeProvider
      themes={['light', 'dark']}
      enableSystem={false}
      defaultTheme="dark"
    >
      <ChakraProvider theme={flashlessTheme}>{children}</ChakraProvider>
    </NextThemeProvider>
  );
};
