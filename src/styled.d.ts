import 'styled-components/macro';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      background: {
        primary: string;
        secondary: string;
        secondaryDark: string;
        secondaryDarker: string;
        secondaryDarkest: string;
      };
      text: {
        primaryLight: string;
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
