import React, { FC } from 'react';
import { ThemeProvider } from 'styled-components/macro';
import theme from './Themes/theme';
import GlobalStyle from './globalStyle';
import Router from './Router/Router';

const App: FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Router />
    </ThemeProvider>
  );
};

export default App;
