import { ErrorResponse, ErrorsBase } from 'Types/Error';
import { Image } from './Image';

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
  image: Image | null;
}

export interface CreateUserErrors extends ErrorsBase {
  Email: string[];
  Password: string[];
  RepeatPassword: string[];
}

export type CreateUserErrorResponse = ErrorResponse<CreateUserErrors>;
