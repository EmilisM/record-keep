import 'styled-components/macro';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      background: {
        first: string;
        second: string;
        third: string;
        fourth: string;
      };
      text: {
        primary: string;
        secondary: string;
      };
    };
    font: {
      fontFamily: {
        primary: string;
      };
      fontWeight: {
        light: number;
        regular: number;
        semiBold: number;
        bold: number;
      };
    };
  }
}
