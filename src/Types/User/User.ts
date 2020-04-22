import { ErrorResponse, ErrorsBase } from 'Types/Error';
import { Image } from 'Types/Image';
import { PatchOperations } from 'Types/API';

export interface TokenResponse {
  access_token: string;
}

export interface ErrorTokenResponse {
  error: string;
  error_description: string;
}

export interface UserInfo {
  email: string;
  displayName: string | null;
  creationDate: Date;
  profileImage: Image | null;
}

export interface CreateUserErrors extends ErrorsBase {
  email: string[];
  password: string[];
  repeatPassword: string[];
}

export type CreateUserErrorResponse = ErrorResponse<CreateUserErrors>;

export interface UpdateUserInfoDisplayName {
  op: PatchOperations;
  path: '/displayName';
  value: string | null;
}

export interface UpdateUserInfoImageId {
  op: PatchOperations;
  path: '/imageId';
  value: number | null;
}

export type UpdateUserInfo = UpdateUserInfoDisplayName | UpdateUserInfoImageId;
