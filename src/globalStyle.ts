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

  .ReactModal__Body--open {
    overflow: hidden;
  }

  .ReactModal__Overlay {
    opacity: 0;
    transition: opacity 200ms ease;

    display: flex;
    flex-direction: column;
    align-items: center;

    overflow: auto;

    @media (max-width: ${props => props.theme.breakpoints.desktop}) {
      overflow: hidden;
    }
  }

  .ReactModal__Overlay--after-open {
    opacity: 1;
  }

  .ReactModal__Overlay--before-close {
    opacity: 0;
  }
`;

export default GlobalStyle;
