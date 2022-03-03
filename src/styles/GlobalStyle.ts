import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html, body, #app {
    height: 100%;
  }

  body {
    font-family: -apple-system, "Helvetica Neue", Helvetica, Arial,
      "Hiragino Kaku Gothic ProN", "Hiragino Sans", Meiryo, sans-serif;
    background: ${props => props.theme.background};
    color: ${props => props.theme.color};
  }

  a {
    &:link, &:hover, &:visited, &:active {
      color: inherit;
      text-decoration: inherit;
    }
  }

  button {
    background-color: transparent;
    border: none;
    cursor: pointer;
    outline: none;
    padding: 0;
    appearance: none;
    color: inherit;
    font-size: inherit;
    text-transform: inherit;

    &:focus-visible {
      outline: revert;
    }
  }
`;
