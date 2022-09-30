import React from 'react';
import { ThemeProvider } from 'styled-components';
import { defaultTheme } from './default';

export const CustomThemeProvider = ({ children }: {children: React.ReactNode}) => {
  return <ThemeProvider theme={defaultTheme}>{children}</ThemeProvider>;
};
