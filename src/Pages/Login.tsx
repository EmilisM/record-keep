import React, { ReactElement, useState } from 'react';

import RadioButton from 'Atoms/Radio';
import LoginForm from 'Molecules/LoginForm';
import styled from 'styled-components/macro';
import { RadioOptionType } from 'Types/Radio';

const LoginFormStyled = styled(LoginForm)`
  margin-top: 20px;
`;

type LoginFormType = 'login' | 'signup';

export const loginFormOptions: RadioOptionType<LoginFormType>[] = [
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

  return (
    <>
      <RadioButton<LoginFormType>
        options={loginFormOptions}
        name="login-switcher"
        fontWeight="light"
        value={activeForm}
        onChange={(e, value) => setActiveForm(value)}
      />
      <LoginFormStyled type={activeForm.value} />
    </>
  );
};

export default Login;
