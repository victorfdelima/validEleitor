import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Inter', sans-serif;
    font-size: 16px;
    
    box-shadow: none !important;

    &:hover {
      box-shadow: none !important;
    }

    &:active {
      box-shadow: none !important;
    }

    &:focus {
      box-shadow: none !important;
    }
  }

  body {
    background: ${(props) => props.theme.colors.darkGray};
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
