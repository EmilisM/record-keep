import React, { FC } from 'react';
import { ThemeProvider } from 'styled-components/macro';
import theme from './Themes/theme';
import GlobalStyle from './globalStyle';
import AppLayout from './Layouts/AppLayout';
import { BrowserRouter } from 'react-router-dom';
import BaseRoute from './Routes/BaseRoute';

const App: FC = () => {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <AppLayout>
          <BaseRoute />
        </AppLayout>
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default App;
