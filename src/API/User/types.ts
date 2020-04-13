import { ErrorResponse, ErrorsBase } from 'Types/Error';

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
}

export interface CreateUserErrors extends ErrorsBase {
  Email: string[];
  Password: string[];
  RepeatPassword: string[];
}

export type CreateUserErrorResponse = ErrorResponse<CreateUserErrors>;
