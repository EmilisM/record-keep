export const getErrorMessage = (errors: string[] | undefined): string => {
  return errors ? errors.join() : '';
};

export interface ErrorsBase {
  form: string[];
}

export type ErrorResponse<T extends ErrorsBase> = {
  errors: T;
};
