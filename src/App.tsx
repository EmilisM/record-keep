import React, { ReactElement } from 'react';
import { ThemeProvider } from 'styled-components/macro';
import GlobalStyle from './globalStyle';
import theme from 'Themes/theme';
import BaseRoute from 'Routes/BaseRoute';
import { AuthServiceContext } from 'Services/Hooks/useAuthService';
import useAuthService from 'Services/Hooks/useAuthService';
import { PageLoader } from 'Atoms/Loader/PageLoader';
import Modal from 'react-modal';
import CustomToastContainer from 'Atoms/CustomToastContainer';

Modal.setAppElement('#root');

const App = (): ReactElement => {
  const authServiceStorage = useAuthService();

  return (
    <AuthServiceContext.Provider value={authServiceStorage}>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <PageLoader isLoading={authServiceStorage.isLoading}>
          <BaseRoute />
          <CustomToastContainer />
        </PageLoader>
      </ThemeProvider>
    </AuthServiceContext.Provider>
  );
};

export default App;
