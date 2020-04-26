import 'styled-components/macro';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      background: {
        primary: string;
        primaryDarker: string;
        primaryLight: string;
        secondary: string;
        secondaryDark: string;
        secondaryDarker: string;
        secondaryDarkest: string;
        secondaryLighter: string;
        secondaryDarkLighter: string;
        secondaryDarkerLighter: string;
        secondaryDarkestLighter: string;
      };
      text: {
        primaryLight: string;
        primaryLighter: string;
        primaryDark: string;
        primaryDarker: string;
        error: string;
      };
      border: {
        primary: string;
        cardShadow: string;
        error: string;
      };
      special: {
        loaderFirst: string;
        loaderSecond: string;
        success: string;
        error: string;
      };
    };
    font: {
      fontFamily: {
        primary: string;
      };
      fontWeight: {
        light: string;
        regular: string;
        semiBold: string;
        bold: string;
      };
    };
    breakpoints: {
      mobile: string;
      desktop: string;
    };
  }
}
