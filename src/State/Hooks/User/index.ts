import { createContext, useContext, useCallback } from 'react';
import { State } from 'Types/State';
import { useDispatch } from 'State/mainStore';
import { getUserInfo as getUserInfoApi } from 'API/User';
import { AxiosError } from 'axios';

export const UserContext = createContext<State['user']>(null);

export const useUserState = (): State['user'] => {
  const user = useContext(UserContext);

  return user;
};

export const useUserInfo = (): (() => State['user']) => {
  const userState = useUserState();
  const dispatch = useDispatch();

  const getUserInfo = useCallback((): State['user'] => {
    if (!userState) {
      dispatch({ type: 'User/Info/Loading', payload: 'Loading' });
      getUserInfoApi()
        .then(info => {
          dispatch({ type: 'User/Info', payload: info });
        })
        .catch((err: AxiosError) => {
          dispatch({ type: 'User/Info/Error', payload: { code: err.code || '', error: err.message } });
        });
    }

    return userState;
  }, [userState, dispatch]);

  return getUserInfo;
};
