import React, { FC } from 'react';
import { ThemeProvider } from 'styled-components/macro';
import theme from './theme';
import GlobalStyle from './globalStyle';
import Router from './Router';

const App: FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Router />
    </ThemeProvider>
  );
};

export default App;
