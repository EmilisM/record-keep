import axios, { AxiosInstance } from 'axios';
import { Headers } from 'Types/API';
import { RouteConfig } from 'Routes/RouteConfig';

const getAuthorizationHeader = (): string | null => {
  const token = window.localStorage.getItem('access_token');

  if (!token) {
    return null;
  }

  try {
    return JSON.parse(token);
  } catch (error) {
    return null;
  }
};

const removeAccessToken = (): void => {
  window.localStorage.removeItem('access_token');
};

const getHeaders = (): Headers => {
  const authHeader = getAuthorizationHeader();

  return authHeader
    ? {
        Authorization: `Bearer ${authHeader}`,
      }
    : {};
};

const getAPIInstance = (): AxiosInstance => {
  const API = axios.create();

  API.interceptors.request.use(config => {
    config.headers = getHeaders();

    return config;
  });

  API.interceptors.response.use(
    config => config,
    error => {
      if (error.response?.status === 401) {
        removeAccessToken();
        window.location.replace(RouteConfig.Login);
      }

      return Promise.reject(error);
    },
  );

  return API;
};

const API = getAPIInstance();

export default API;

export const authServer = axios.create({
  headers: {
    'Content-type': 'application/x-www-form-urlencoded',
  },
});
