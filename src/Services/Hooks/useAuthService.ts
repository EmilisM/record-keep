import useLocalStorage from './useLocalStorage';
import { useEffect, useCallback } from 'react';
import { createContext, useContext } from 'react';
import API from 'API/index';
import { getUserInfo } from 'API/User';
import { useHistory } from 'react-router-dom';
import { RouteConfig } from 'Routes/RouteConfig';

type AuthService = {
  accessToken: string | null;
  setAccessToken: (value: string) => void;
  removeAccessToken: () => void;
  logout: () => void;
};

const useAuthService = (): AuthService => {
  const [accessToken, setAccessToken, removeAccessToken] = useLocalStorage<string | null>('access_token', null);
  const { push } = useHistory();

  const logout = useCallback((): void => {
    removeAccessToken();
    push(RouteConfig.Login);
  }, [push, removeAccessToken]);

  useEffect(() => {
    if (accessToken) {
      API.defaults.headers['Authorization'] = `Bearer ${accessToken}`;

      getUserInfo().catch(() => logout());
    }
  }, [accessToken, removeAccessToken, logout]);

  return {
    accessToken,
    setAccessToken,
    removeAccessToken,
    logout,
  };
};

export const AuthServiceContext = createContext<AuthService | null>(null);

export const useAuthServiceContext = (): AuthService => {
  const authService = useContext(AuthServiceContext);
  if (!authService) {
    throw new Error('AuthServiceContext not initialized');
  }

  return authService;
};

export default useAuthService;
