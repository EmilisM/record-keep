import { DefaultTheme } from 'styled-components/macro';

const theme: DefaultTheme = {
  colors: {
    background: {
      primary: '#F3F1F4',
      secondary: '#9C7481',
      secondaryDark: '#43364A',
      secondaryDarker: '#2F3043',
      secondaryDarkest: '#1B1724',
      secondaryLighter: '#B78E9B',
      secondaryDarkLighter: '#5B4D62',
      secondaryDarkerLighter: '#46465A',
      secondaryDarkestLighter: '#302B3A',
    },
    text: {
      primaryLight: '#F3F1F4',
      primaryDark: '#2F3043',
    },
    border: {
      primary: '#F3F1F4',
    },
  },
  font: {
    fontFamily: {
      primary: `'Source Sans Pro', sans-serif`,
    },
    fontWeight: {
      light: '300',
      regular: '400',
      bold: '600',
      semiBold: '700',
    },
  },
  responsive: {
    mobile: '(max-width: 600px)',
    tablet: '((min-width: 601px) and (max-width: 1025px))',
    desktop: '(min-width: 1026px)',
  },
};

export default theme;
