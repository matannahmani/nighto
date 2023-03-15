import type {
  ChakraTheme,
  ComponentStyleConfig,
  ThemeConfig,
} from '@chakra-ui/react';
import { extendTheme } from '@chakra-ui/react';
import { CalendarDefaultTheme } from '@uselessdev/datepicker';

import type { Colors } from '@chakra-ui/react';

const colors: Colors = {
  transparent: 'transparent',
  current: 'currentColor',
  black: '#000000',
  white: '#FFFFFF',
  whiteAlpha: {
    50: 'rgba(255, 255, 255, 0.04)',
    100: 'rgba(255, 255, 255, 0.06)',
    200: 'rgba(255, 255, 255, 0.08)',
    300: 'rgba(255, 255, 255, 0.16)',
    400: 'rgba(255, 255, 255, 0.24)',
    500: 'rgba(255, 255, 255, 0.36)',
    600: 'rgba(255, 255, 255, 0.48)',
    700: 'rgba(255, 255, 255, 0.64)',
    800: 'rgba(255, 255, 255, 0.80)',
    900: 'rgba(255, 255, 255, 0.92)',
  },
  blackAlpha: {
    50: 'rgba(0, 0, 0, 0.04)',
    100: 'rgba(0, 0, 0, 0.06)',
    200: 'rgba(0, 0, 0, 0.08)',
    300: 'rgba(0, 0, 0, 0.16)',
    400: 'rgba(0, 0, 0, 0.24)',
    500: 'rgba(0, 0, 0, 0.36)',
    600: 'rgba(0, 0, 0, 0.48)',
    700: 'rgba(0, 0, 0, 0.64)',
    800: 'rgba(0, 0, 0, 0.80)',
    900: 'rgba(0, 0, 0, 0.92)',
  },
  gray: {
    50: '#F7FAFC',
    100: '#EDF2F7',
    200: '#E2E8F0',
    300: '#CBD5E0',
    400: '#A0AEC0',
    500: '#718096',
    600: '#4A5568',
    700: '#2D3748',
    800: '#1A202C',
    900: '#171923',
  },
  red: {
    50: '#fffafa',
    100: '#ffcac7',
    200: '#ffb2ad',
    300: '#ff9a93',
    400: '#ff827a',
    500: '#FF5247',
    600: '#ff2214',
    700: '#fa0f00',
    800: '#e00d00',
    900: '#ad0a00',
  },
  orange: {
    50: '#FFFAF0',
    100: '#FEEBC8',
    200: '#FBD38D',
    300: '#F6AD55',
    400: '#ED8936',
    500: '#DD6B20',
    600: '#C05621',
    700: '#9C4221',
    800: '#7B341E',
    900: '#652B19',
  },
  yellow: {
    50: '#fefbf4',
    100: '#fbebc5',
    200: '#f9e2ad',
    300: '#f7da95',
    400: '#f5d27e',
    500: '#F2C14E',
    600: '#efb01e',
    700: '#e3a411',
    800: '#cb930f',
    900: '#9c710b',
  },
  green: {
    50: '#F0FFF4',
    100: '#C6F6D5',
    200: '#9AE6B4',
    300: '#68D391',
    400: '#48BB78',
    500: '#38A169',
    600: '#2F855A',
    700: '#276749',
    800: '#22543D',
    900: '#1C4532',
  },
  teal: {
    50: '#E6FFFA',
    100: '#B2F5EA',
    200: '#81E6D9',
    300: '#4FD1C5',
    400: '#38B2AC',
    500: '#319795',
    600: '#2C7A7B',
    700: '#285E61',
    800: '#234E52',
    900: '#1D4044',
  },
  blue: {
    50: '#ebf8ff',
    100: '#bee3f8',
    200: '#90cdf4',
    300: '#63b3ed',
    400: '#4299e1',
    500: '#3182ce',
    600: '#2b6cb0',
    700: '#2c5282',
    800: '#2a4365',
    900: '#1A365D',
  },
  cyan: {
    50: '#EDFDFD',
    100: '#C4F1F9',
    200: '#9DECF9',
    300: '#76E4F7',
    400: '#0BC5EA',
    500: '#00B5D8',
    600: '#00A3C4',
    700: '#0987A0',
    800: '#086F83',
    900: '#065666',
  },
  purple: {
    50: '#f4f4fd',
    100: '#ccc9f5',
    200: '#b7b4f0',
    300: '#a39eec',
    400: '#8f89e8',
    500: '#665EE0',
    600: '#3d33d8',
    700: '#3127cb',
    800: '#2c23b5',
    900: '#221b8a',
  },
  pink: {
    50: '#f6eef7',
    100: '#e3cbe6',
    200: '#dabade',
    300: '#d1a9d6',
    400: '#c898ce',
    500: '#B575BD',
    600: '#a353ad',
    700: '#924a9b',
    800: '#82428a',
    900: '#623268',
  },
  linkedin: {
    50: '#E8F4F9',
    100: '#CFEDFB',
    200: '#9BDAF3',
    300: '#68C7EC',
    400: '#34B3E4',
    500: '#00A0DC',
    600: '#008CC9',
    700: '#0077B5',
    800: '#005E93',
    900: '#004471',
  },
  facebook: {
    50: '#E8F4F9',
    100: '#D9DEE9',
    200: '#B7C2DA',
    300: '#6482C0',
    400: '#4267B2',
    500: '#385898',
    600: '#314E89',
    700: '#29487D',
    800: '#223B67',
    900: '#1E355B',
  },
  messenger: {
    50: '#D0E6FF',
    100: '#B9DAFF',
    200: '#A2CDFF',
    300: '#7AB8FF',
    400: '#2E90FF',
    500: '#0078FF',
    600: '#0063D1',
    700: '#0052AC',
    800: '#003C7E',
    900: '#002C5C',
  },
  whatsapp: {
    50: '#dffeec',
    100: '#b9f5d0',
    200: '#90edb3',
    300: '#65e495',
    400: '#3cdd78',
    500: '#22c35e',
    600: '#179848',
    700: '#0c6c33',
    800: '#01421c',
    900: '#001803',
  },
  twitter: {
    50: '#E5F4FD',
    100: '#C8E9FB',
    200: '#A8DCFA',
    300: '#83CDF7',
    400: '#57BBF5',
    500: '#1DA1F2',
    600: '#1A94DA',
    700: '#1681BF',
    800: '#136B9E',
    900: '#0D4D71',
  },
  telegram: {
    50: '#E3F2F9',
    100: '#C5E4F3',
    200: '#A2D4EC',
    300: '#7AC1E4',
    400: '#47A9DA',
    500: '#0088CC',
    600: '#007AB8',
    700: '#006BA1',
    800: '#005885',
    900: '#003F5E',
  },
  primary: {
    50: '#f4f4fd',
    100: '#ccc9f5',
    200: '#b7b4f0',
    300: '#a39eec',
    400: '#8f89e8',
    500: '#665EE0',
    600: '#3d33d8',
    700: '#3127cb',
    800: '#2c23b5',
    900: '#221b8a',
  },
};

const extraTheme: ThemeConfig = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
};
const semanticTokens: ChakraTheme['semanticTokens'] = {
  colors: {
    error: 'red.500',
    success: 'green.500',
    primary: {
      default: 'purple.400',
      _dark: 'purple.400',
    },
    secondary: {
      default: 'teal.500',
      _dark: 'teal.600',
    },
  },
};

const Radio: ComponentStyleConfig = {
  baseStyle: {
    control: {
      _checked: {
        backgroundColor: 'purple.500',
        borderColor: 'purple.500',
        _before: {
          content: "'✓'",
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          pos: 'relative',
          w: '100%',
          h: '100%',
          borderRadius: '50%',
          bg: 'unset',
          fontWeight: 'bold',
          color: 'white',
        },
      },
    },
    label: {
      pointerEvents: 'none',
    },
  },
};

export const theme = extendTheme(
  CalendarDefaultTheme as Record<string, string>,
  {
    components: {
      CalendarDay: {
        // parts: ['button'],

        baseStyle: {
          _disabled: {
            opacity: 0.4,
          },

          _hover: {
            bg: 'gray.600',
          },
        },
      },
    },
  },
  {
    components: {
      Radio,
    },
    colors,
    semanticTokens,
    config: extraTheme,
  }
) as ChakraTheme;
