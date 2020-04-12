import React, { ReactElement, useState, FormEvent } from 'react';

import RadioButton from 'Atoms/Radio';
import LoginForm from 'Molecules/LoginForm';
import styled from 'styled-components/macro';
import { RadioOptionType } from 'Types/Radio';
import { useAuthServiceContext } from 'Services/Hooks/useAuthService';
import { getAccessToken } from 'API/User';
import { useHistory } from 'react-router-dom';
import { RouteConfig } from 'Routes/RouteConfig';
import { AxiosError } from 'axios';
import { ErrorTokenResponse } from 'API/User/types';

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
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [formError, setFormError] = useState<string>();

  const [, setAccessToken] = useAuthServiceContext();
  const { push } = useHistory();

  const onClearFormError = (): void => {
    setFormError(undefined);
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    if (activeForm.value === 'login') {
      getAccessToken(username, password)
        .then(token => {
          setAccessToken(token.access_token);
          push(RouteConfig.Dashboard.Root);
        })
        .catch((error: AxiosError<ErrorTokenResponse>) => setFormError(error.response?.data.error_description));
    } else if (activeForm.value === 'signup') {
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
        username={username}
        setUsername={setUsername}
        password={password}
        setPassword={setPassword}
        repeatPassword={repeatPassword}
        setRepeatPassword={setRepeatPassword}
        formError={formError}
      />
    </>
  );
};

export default Login;
