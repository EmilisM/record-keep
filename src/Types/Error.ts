import { AxiosError } from 'axios';

export const getErrorMessage = (errors: string[] | undefined): string => {
  return errors ? errors.join() : '';
};

export interface ErrorsBase {
  form: string[];
}

export type ErrorResponse<T extends ErrorsBase> = {
  errors: T;
};

export const isAxiosError = <T = any>(value: unknown): value is AxiosError<T> => {
  return (value as AxiosError<T>).isAxiosError;
};
