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
        secondaryLighter: string;
        secondaryDarkLighter: string;
        secondaryDarkerLighter: string;
        secondaryDarkestLighter: string;
      };
      text: {
        primaryLight: string;
        primaryDark: string;
      };
      border: {
        primary: string;
      };
    };
    font: {
      fontFamily: {
        primary: string;
      };
    };
  }
}
