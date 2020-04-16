import useLocalStorage from './useLocalStorage';
import { useEffect, useCallback, useState } from 'react';
import { createContext, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { RouteConfig } from 'Routes/RouteConfig';
import { useQuery } from 'react-query';
import { getUserInfo } from 'API/User';

type AuthService = {
  accessToken: string | null;
  setAccessToken: (value: string) => void;
  removeAccessToken: () => void;
  logout: () => void;
  isLoading: boolean;
  isAuth: boolean;
};

const useAuthService = (): AuthService => {
  const [accessToken, setAccessToken, removeAccessToken] = useLocalStorage<string | null>('access_token', null);
  const { push } = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  const [isAuth, setIsAuth] = useState(true);
  const { refetch } = useQuery('userInfo', getUserInfo, { manual: true });

  const logout = useCallback((): void => {
    setIsAuth(false);
    removeAccessToken();
    push(RouteConfig.Login);
  }, [push, removeAccessToken]);

  useEffect(() => {
    if (accessToken) {
      setIsLoading(true);
      refetch().then(() => {
        setIsAuth(true);
        setIsLoading(false);
      });
    } else {
      setIsAuth(false);
    }
  }, [accessToken, refetch]);

  return {
    accessToken,
    setAccessToken,
    removeAccessToken,
    logout,
    isLoading,
    isAuth,
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
