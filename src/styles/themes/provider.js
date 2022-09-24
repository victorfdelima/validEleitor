import { ThemeProvider } from 'styled-components';
import { defaultTheme } from './default';

export const CustomThemeProvider = ({ children }) => {
  return <ThemeProvider theme={defaultTheme}>{children}</ThemeProvider>;
};
