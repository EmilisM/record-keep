import React, { ReactElement, useState, FormEvent } from 'react';

import RadioButton from 'Atoms/Radio';
import LoginForm from 'Molecules/LoginForm';
import styled from 'styled-components/macro';
import { RadioOptionType } from 'Types/Radio';
import { useAuthServiceContext } from 'Services/Hooks/useAuthService';
import { getAccessToken, createUser } from 'API/User';
import { useHistory, Redirect } from 'react-router-dom';
import { RouteConfig } from 'Routes/RouteConfig';
import { AxiosError } from 'axios';
import { ErrorTokenResponse, CreateUserErrorResponse } from 'Types/User/User';
import { LoginField } from 'Types/Login';
import Loader from 'Atoms/Loader/Loader';

const LoginFormStyled = styled(LoginForm)`
  margin-top: 20px;
`;

const RadioContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: 400px;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    max-width: 100%;
  }
`;

const LoaderStyled = styled(Loader)`
  width: 36px;
  height: 36px;
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
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { setAccessToken, isAuth } = useAuthServiceContext();
  const { push } = useHistory();

  if (isAuth) {
    return <Redirect to={RouteConfig.Dashboard.Root} />;
  }

  const onClearFormError = (): void => {
    setFormError(undefined);
  };

  const logUserIn = (): Promise<void> =>
    getAccessToken(email.value, password.value)
      .then(token => {
        setAccessToken(token.access_token);
        setIsLoading(false);
        push(RouteConfig.Dashboard.Root);
      })
      .catch((error: AxiosError<ErrorTokenResponse>) => {
        setIsLoading(false);
        if (error.response) {
          setFormError([error.response.data.error_description]);
        }
      });

  const onSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    if (isLoading) {
      return;
    }

    setIsLoading(true);
    if (activeForm.value === 'login') {
      logUserIn();
    } else if (activeForm.value === 'signup') {
      createUser(email.value, password.value, repeatPassword.value)
        .then(() => logUserIn())
        .catch((error: AxiosError<CreateUserErrorResponse>) => {
          setIsLoading(false);

          const errors = error.response?.data.errors;
          setEmail({ ...email, error: errors?.email });
          setPassword({ ...password, error: errors?.password });
          setRepeatPassword({ ...repeatPassword, error: errors?.repeatPassword });
          setFormError(errors?.form);
        });
    }
  };

  return (
    <>
      <RadioContainer>
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
        {isLoading && <LoaderStyled />}
      </RadioContainer>
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
