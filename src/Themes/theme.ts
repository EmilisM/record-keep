import { DefaultTheme } from 'styled-components/macro';

const theme: DefaultTheme = {
  colors: {
    background: {
      primary: '#F3F1F4',
      primaryDarker: '#dfd8e2',
      primaryLight: '#e7e2e9',
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
      primaryLighter: 'rgba(243, 241, 244, 0.6)',
      primaryDark: '#2F3043',
      primaryDarker: '#303030',
      error: '#ff3333',
    },
    border: {
      primary: '#F3F1F4',
      cardShadow: '#8c8291',
      error: '#ff3333',
    },
    special: {
      loaderFirst: '#667eea',
      loaderSecond: '#764ba2',
      success: '#8bc34a',
      error: '#ff3333',
      chartColorsPrimary: ['#9C7481', '#43364A', '#2F3043', '#302B3A'],
    },
  },
  font: {
    fontFamily: {
      primary: `'Source Sans Pro', sans-serif`,
    },
    fontWeight: {
      light: '300',
      regular: '400',
      semiBold: '600',
      bold: '700',
    },
  },
  breakpoints: {
    mobile: '600px',
    desktop: '1000px',
  },
};

export default theme;
