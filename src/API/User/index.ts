/* eslint-disable @typescript-eslint/camelcase */
import API, { authServer } from 'API';
import { TokenResponse, UserInfo } from 'Types/User';
import { ImageOptionsRequest } from 'Types/Image';

export const getAccessToken = async (email: string, password: string): Promise<TokenResponse> => {
  const params = new URLSearchParams([
    ['client_id', 'record-keep'],
    ['grant_type', 'password'],
    ['username', email],
    ['password', password],
  ]);

  const accessTokenResponse = await authServer.post<TokenResponse>('/auth/connect/token', params);

  return accessTokenResponse.data;
};

export const createUser = async (email: string, password: string, repeatPassword: string): Promise<UserInfo> => {
  const createUser = await API.post<UserInfo>('/api/user', {
    email,
    password,
    repeatPassword,
  });

  return createUser.data;
};

export const changePassword = async (oldPassword: string, password: string, repeatPassword: string): Promise<void> => {
  await API.post('/api/user/password', {
    oldPassword,
    password,
    repeatPassword,
  });
};

export const getUserInfo = async (): Promise<UserInfo> => {
  const userInfoResponse = await API.get<UserInfo>('/api/user/info');

  return userInfoResponse.data;
};

export const updateUserInfo = async (displayName?: string, imageOptions?: ImageOptionsRequest): Promise<void> => {
  await API.patch('/api/user/info', {
    displayName,
    imageOptions,
  });
};
