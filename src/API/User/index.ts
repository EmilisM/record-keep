/* eslint-disable @typescript-eslint/camelcase */
import API, { authServer } from 'API';
import {
  TokenResponse,
  UserInfo,
  UpdateUserInfo,
  TokenRequest,
  CreateUserRequest,
  ChangePasswordRequest,
} from 'Types/User';

export const getAccessToken = async (request: TokenRequest): Promise<TokenResponse> => {
  const params = new URLSearchParams([
    ['client_id', 'record-keep'],
    ['grant_type', 'password'],
    ['username', request.email],
    ['password', request.password],
  ]);

  const accessTokenResponse = await authServer.post<TokenResponse>('/auth/connect/token', params);

  return accessTokenResponse.data;
};

export const createUser = async (request: CreateUserRequest): Promise<UserInfo> => {
  const createUser = await API.post<UserInfo>('/api/user', request);

  return createUser.data;
};

export const changePassword = async (request: ChangePasswordRequest): Promise<void> => {
  return await API.post('/api/user/password', request);
};

export const getUserInfo = async (): Promise<UserInfo> => {
  const userInfoResponse = await API.get<UserInfo>('/api/user/info');

  return userInfoResponse.data;
};

export const updateUserInfo = async (data: UpdateUserInfo[]): Promise<void> => {
  return await API.patch('/api/user/info', data);
};
