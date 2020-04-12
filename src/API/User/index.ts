/* eslint-disable @typescript-eslint/camelcase */
import API, { authServer } from 'API';
import { TokenResponse, UserInfo } from './types';

export const getAccessToken = async (username: string, password: string): Promise<TokenResponse> => {
  const params = new URLSearchParams([
    ['client_id', 'record-keep'],
    ['grant_type', 'password'],
    ['username', username],
    ['password', password],
  ]);

  const accessTokenResponse = await authServer.post<TokenResponse>('/auth/connect/token', params);

  return accessTokenResponse.data;
};

export const getUserInfo = async (): Promise<UserInfo> => {
  const userInfo = await API.get<UserInfo>('/api/user/info');

  return userInfo.data;
};
