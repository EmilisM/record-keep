import React, { ReactElement, useState } from 'react';

import RadioButton from 'Atoms/Radio';
import LoginForm from 'Molecules/Form/LoginForm';
import styled from 'styled-components/macro';
import { RadioOptionType } from 'Types/Radio';
import { useAuthServiceContext } from 'Services/Hooks/useAuthService';
import { getAccessToken as getAccessTokenAPI, createUser as createUserAPI } from 'API/User';
import { useHistory, Redirect } from 'react-router-dom';
import { RouteConfig } from 'Routes/RouteConfig';
import { AxiosError } from 'axios';
import { ErrorTokenResponse, CreateUserErrorResponse } from 'Types/User/User';
import Loader from 'Atoms/Loader/Loader';
import { LoginFormFields } from 'Types/Login';
import { FormikErrors, FormikHelpers } from 'formik';
import { getErrorMessage } from 'Types/Error';
import { useMutation } from 'react-query';

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
  const { setAccessToken, isAuth } = useAuthServiceContext();
  const [getAccessToken, { status: tokenStatus }] = useMutation(getAccessTokenAPI, { throwOnError: true });
  const [createUser, { status: createUserStatus }] = useMutation(createUserAPI, { throwOnError: true });
  const { push } = useHistory();

  if (isAuth) {
    return <Redirect to={RouteConfig.Dashboard.Root} />;
  }

  const initialValue: LoginFormFields = {
    email: '',
    password: '',
    repeatPassword: '',
  };

  const validate = (values: LoginFormFields): FormikErrors<LoginFormFields> => {
    const errors: FormikErrors<LoginFormFields> = {};

    if (!values.email) {
      errors.email = 'Email is required';
    }

    if (!values.password) {
      errors.password = 'Password is required';
    }

    if (!values.repeatPassword && activeForm.value === 'signup') {
      errors.repeatPassword = 'Repeat password is required';
    }

    return errors;
  };

  const logUserIn = (accessToken: string): void => {
    setAccessToken(accessToken);
    push(RouteConfig.Dashboard.Root);
  };

  const onSubmit = (values: LoginFormFields, helpers: FormikHelpers<LoginFormFields>): void => {
    if (activeForm.value === 'login') {
      getAccessToken({ email: values.email, password: values.password })
        .then(token => {
          logUserIn(token.access_token);
        })
        .catch((error: AxiosError<ErrorTokenResponse>) => {
          helpers.setErrors({
            form: error.response?.data.error_description,
          });
        });
    } else if (activeForm.value === 'signup') {
      createUser({ email: values.email, password: values.password, repeatPassword: values.repeatPassword })
        .then(() => getAccessToken({ email: values.email, password: values.password }))
        .then(token => logUserIn(token.access_token))
        .catch((err: AxiosError<CreateUserErrorResponse>) => {
          helpers.setErrors({
            email: getErrorMessage(err.response?.data.errors.email),
            password: getErrorMessage(err.response?.data.errors.password),
            repeatPassword: getErrorMessage(err.response?.data.errors.repeatPassword),
            form: getErrorMessage(err.response?.data.errors.form),
          });
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
          onChange={(e, value) => setActiveForm(value)}
        />
        {tokenStatus === 'loading' || createUserStatus === 'loading' ? <LoaderStyled /> : null}
      </RadioContainer>
      <LoginFormStyled type={activeForm.value} initialValue={initialValue} onSubmit={onSubmit} validate={validate} />
    </>
  );
};

export default Login;
