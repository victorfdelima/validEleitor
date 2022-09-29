import { extendTheme } from '@chakra-ui/react';

export const chakraTheme = extendTheme({
  colors: {
    text: '#272D2D',
    middle: '#A39BA8',
    shade: {
      main: '#B8C5D6',
      light: '#E5E9F2',
    },
    light: '#EDF5FC',
    mainLight: '#aaf7ca',
    main: '#23CE6B',
    mainDark: '#1E9E4A',
  },
  styles: {
    global: (props: any) => ({
      body: {
        bg: 'shade.light',
        color: 'text',
      },
    }),
  },
});
