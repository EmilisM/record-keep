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
