import React, { ReactElement, useState, FormEvent } from 'react';

import RadioButton from 'Atoms/Radio';
import LoginForm from 'Molecules/LoginForm';
import styled from 'styled-components/macro';
import { RadioOptionType } from 'Types/Radio';
import { useAuthServiceContext } from 'Services/Hooks/useAuthService';
import { getAccessToken, createUser } from 'API/User';
import { useHistory } from 'react-router-dom';
import { RouteConfig } from 'Routes/RouteConfig';
import { AxiosError } from 'axios';
import { ErrorTokenResponse, CreateUserErrorResponse } from 'API/User/types';
import { LoginField } from 'Types/Login';

const LoginFormStyled = styled(LoginForm)`
  margin-top: 20px;
`;

type LoginFormType = 'login' | 'signup';

const loginFormOptions: RadioOptionType<LoginFormType>[] = [
  {
    value: 'login',
    label: 'Log in',
  },
  {
    value: 'signup',
    label: 'Sign up',
  },
];

const Login = (): ReactElement => {
  const [activeForm, setActiveForm] = useState<RadioOptionType<LoginFormType>>(loginFormOptions[0]);
  const [email, setEmail] = useState<LoginField>({ value: '' });
  const [password, setPassword] = useState<LoginField>({ value: '' });
  const [repeatPassword, setRepeatPassword] = useState<LoginField>({ value: '' });
  const [formError, setFormError] = useState<string[]>();

  const { setAccessToken } = useAuthServiceContext();
  const { push } = useHistory();

  const onClearFormError = (): void => {
    setFormError(undefined);
  };

  const logUserIn = (): Promise<void> =>
    getAccessToken(email.value, password.value)
      .then(token => {
        setAccessToken(token.access_token);
        push(RouteConfig.Dashboard.Root);
      })
      .catch((error: AxiosError<ErrorTokenResponse>) => {
        if (error.response) {
          setFormError([error.response.data.error_description]);
        }
      });

  const onSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    if (activeForm.value === 'login') {
      logUserIn();
    } else if (activeForm.value === 'signup') {
      createUser(email.value, password.value, repeatPassword.value)
        .then(() => logUserIn())
        .catch((error: AxiosError<CreateUserErrorResponse>) => {
          const errors = error.response?.data.errors;
          setEmail({ ...email, error: errors?.Email });
          setPassword({ ...password, error: errors?.Password });
          setRepeatPassword({ ...password, error: errors?.RepeatPassword });
          setFormError(errors?.form);
        });
    }
  };

  return (
    <>
      <RadioButton
        options={loginFormOptions}
        name="login-switcher"
        fontWeight="light"
        value={activeForm}
        onChange={(e, value) => {
          setActiveForm(value);
          onClearFormError();
        }}
      />
      <LoginFormStyled
        type={activeForm.value}
        onSubmit={onSubmit}
        email={email}
        setEmail={value => setEmail({ ...email, value })}
        password={password}
        setPassword={value => setPassword({ ...password, value })}
        repeatPassword={repeatPassword}
        setRepeatPassword={value => setRepeatPassword({ ...repeatPassword, value })}
        formError={formError}
      />
    </>
  );
};

export default Login;
