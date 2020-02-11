import React, { FC } from 'react';
import { ThemeProvider } from 'styled-components/macro';
import theme from './Themes/theme';
import GlobalStyle from './globalStyle';
import { BrowserRouter } from 'react-router-dom';
import BaseRoute from './Routes/BaseRoute';

const App: FC = () => {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <BaseRoute />
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default App;
