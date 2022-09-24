import { ChakraProvider } from '@chakra-ui/provider';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Router } from './router';
import { GlobalStyle } from './styles/global';
import { chakraTheme } from './styles/themes/chakraTheme';
import { CustomThemeProvider } from './styles/themes/provider';

const container = document.getElementById('root');
if (!container) throw new Error('Failed to find the root element');
const root = ReactDOM.createRoot(container);

root.render(
  <React.StrictMode>
    <ChakraProvider theme={chakraTheme}>
      <CustomThemeProvider>
        <Router />
        <GlobalStyle />
      </CustomThemeProvider>
    </ChakraProvider>
  </React.StrictMode>,
);
