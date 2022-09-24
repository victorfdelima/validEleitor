import { extendTheme } from '@chakra-ui/react';

export const chakraTheme = extendTheme({
  colors: {
    dark: '#0E131B',
    secondary: '#161F2C',
    darkGray: '#1C2532',
    bodyBg: '#1C2532',
    danger: '#FF0D36',
    bodyColor: '#fff',
    primary: '#868686',
    middleGray: '#3a3e42',
    textLight: '#D0D2D6',
    text: '#b4b7bd'
  },
  styles: {
    global: (props) => ({
      body: {
        bg: 'darkGray',
        color: 'bodyColor',
      },
    }),
  },
});
