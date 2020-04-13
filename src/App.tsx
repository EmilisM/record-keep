import React, { useReducer, ReactElement } from 'react';
import { ThemeProvider } from 'styled-components/macro';
import GlobalStyle from './globalStyle';
import theme from 'Themes/theme';
import BaseRoute from 'Routes/BaseRoute';
import { AuthServiceContext } from 'Services/Hooks/useAuthService';
import useAuthService from 'Services/Hooks/useAuthService';
import { mainReducer, initialState, DispatchContext } from 'State/mainStore';
import { UserContext } from 'State/Hooks/User';

const AppContextWrapper = (): ReactElement => {
  const [state, dispatch] = useReducer(mainReducer, initialState);

  return (
    <DispatchContext.Provider value={dispatch}>
      <UserContext.Provider value={state.user}>
        <App />
      </UserContext.Provider>
    </DispatchContext.Provider>
  );
};

const App = (): ReactElement => {
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

export default AppContextWrapper;
