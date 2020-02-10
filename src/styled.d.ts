import 'styled-components/macro';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      background: {
        primary: string;
        secondary: string;
      };
    };
  }
}
