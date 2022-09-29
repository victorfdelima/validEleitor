import { ChakraProvider } from '@chakra-ui/provider';
import React from 'react';
import 'react-circular-progressbar/dist/styles.css';
import ReactDOM from 'react-dom/client';
import { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Router } from './router';
import { GlobalStyle } from './styles/global';
import { chakraTheme } from './styles/themes/chakraTheme';
import { CustomThemeProvider } from './styles/themes/provider';
import { QueryClientProvider, QueryClient } from 'react-query';

const container = document.getElementById('root');
if (!container) throw new Error('Failed to find the root element');
const root = ReactDOM.createRoot(container);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      cacheTime: 60 * 1000,
      staleTime: 60 * 1000,
      retry: false,
    },
  },
});

root.render(
  <React.StrictMode>
    <ChakraProvider theme={chakraTheme}>
      <CustomThemeProvider>
        <SkeletonTheme baseColor='#d5ffd5'>
          <QueryClientProvider client={queryClient}>
            <Router />
            <GlobalStyle />
            <ToastContainer position='bottom-right' />
          </QueryClientProvider>
        </SkeletonTheme>
      </CustomThemeProvider>
    </ChakraProvider>
  </React.StrictMode>,
);
