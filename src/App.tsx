import React, { FC } from 'react';
import { ThemeProvider } from 'styled-components/macro';
import GlobalStyle from './globalStyle';

import theme from 'Themes/theme';
import BaseRoute from 'Routes/BaseRoute';
import { AuthServiceContext } from 'Services/Hooks/useAuthService';
import useAuthService from 'Services/Hooks/useAuthService';

const App: FC = () => {
  const authServiceStorage = useAuthService();

  return (
    <AuthServiceContext.Provider value={authServiceStorage}>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <BaseRoute />
      </ThemeProvider>
    </AuthServiceContext.Provider>
  );
};

export default App;
