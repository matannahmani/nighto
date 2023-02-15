// 1. Import the extendTheme function
import { extendTheme } from '@chakra-ui/react';
import type { Theme, StyleConfig } from '@chakra-ui/react';
// 2. Extend the theme to include custom colors, fonts, etc

const activeLabelStyles = {
  transform: 'scale(0.85) translateY(-24px)',
};
const components: Record<string, StyleConfig> = {
  Form: {
    variants: {
      floating: {
        container: {
          _focusWithin: {
            label: {
              ...activeLabelStyles,
            },
          },
          'input:not(:placeholder-shown) + label, .chakra-select__wrapper + label, textarea:not(:placeholder-shown) ~ label':
            {
              ...activeLabelStyles,
            },
          label: {
            top: 0,
            left: 0,
            zIndex: 2,
            position: 'absolute',
            pointerEvents: 'none',
            mx: 3,
            px: 1,
            my: 2,
            transformOrigin: 'left top',
          },
        },
      },
    },
  },
};

export const theme = extendTheme({
  components,
}) as Theme;
