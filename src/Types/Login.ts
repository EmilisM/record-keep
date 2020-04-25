export type LoginFormType = 'login' | 'signup';

export interface LoginFormFields {
  email: string;
  password: string;
  repeatPassword: string;
  form?: string;
}
