import { createGlobalStyle } from 'styled-components/macro';

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  html, body, #root {
    height: 100%;
    width: 100%;
    margin: 0;
  }

  #root {
    display: flex;
    flex-direction: column;
  }
`;

export default GlobalStyle;
