import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Montserrat', 'Helvetica', 'Arial', sans-serif;
    font-size: 16px;

    &:focus {
      box-shadow: none !important;
    }
  }

  body {
    background: ${(props) => props.theme.colors.shade};
  }

  html {
    font-size: 16px;
    min-height: 100%;

    @media screen and (max-width: 1024px) {
      font-size: 93.75%;
    }

    @media screen and (max-width: 768px) {
      font-size: 87.5%;
    }

    @media screen and (max-width: 425px) {
      font-size: 81.25%;
    }
  }

  button {
    cursor: pointer;
  }
`;
